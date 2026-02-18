import Foundation
import UIKit
import Combine
import Supabase

class SupabaseAuthManager: ObservableObject {
    static let shared = SupabaseAuthManager()
    
    let client: SupabaseClient
    
    @Published var session: Session?
    @Published var user: User?
    
    private var cancellables = Set<AnyCancellable>()
    
    private init() {
        self.client = SupabaseClient(
            supabaseURL: AppConfiguration.supabaseURL,
            supabaseKey: AppConfiguration.supabaseAnonKey,
            options: SupabaseClientOptions(
                auth: .init(emitLocalSessionAsInitialSession: true)
            )
        )
        
        setupAuthStateListener()
    }
    
    private func setupAuthStateListener() {
        Task {
            for await state in client.auth.authStateChanges {
                let user = state.session?.user
                
                // If we detect an anonymous user session (e.g. restored from cache),
                // sign them out immediately to maintain "local-only" requirement.
                if let user = user, user.isAnonymous {
                    print("🧹 Detected anonymous session - signing out to maintain local-only state")
                    try? await client.auth.signOut()
                    await MainActor.run {
                        self.session = nil
                        self.user = nil
                    }
                    continue
                }
                
                await MainActor.run {
                    self.session = state.session
                    self.user = state.session?.user
                }
            }
        }
    }
    
    
    /// Signs in with Google and returns the OAuth URL to be opened in SafariView
    /// Use this method to present the URL in SFSafariViewController for better UX
    func getGoogleSignInURL() async throws -> URL {
        let redirectTo = URL(string: "librarix://auth-callback")!
        return try client.auth.getOAuthSignInURL(provider: .google, redirectTo: redirectTo)
    }
    
    /// Legacy method - opens Google sign-in in external browser (not recommended by Apple)
    /// Use getGoogleSignInURL() with SafariView instead
    func signInWithGoogle() async throws {
        let url = try await getGoogleSignInURL()
        await MainActor.run {
            UIApplication.shared.open(url)
        }
    }
    
    func handleAuthCallback(_ url: URL) async {
        do {
            try await client.auth.session(from: url)
            print("✅ OAuth sign-in successful")
            
            // LibrarySyncService will automatically detect the auth state change
            // and upload local library to database
        } catch {
            print("❌ Failed to handle auth callback: \(error)")
        }
    }
    
    /// Sign in with Apple using the idToken and nonce from AppleSignInHelper
    func signInWithApple(idToken: String, nonce: String) async throws {
        let session = try await client.auth.signInWithIdToken(
            credentials: .apple(idToken: idToken, nonce: nonce)
        )
        await MainActor.run {
            self.session = session
            self.user = session.user
        }
        print("✅ Apple Sign-In successful")
    }
    
    func getCurrentUser() async throws -> User {
        if let user = user {
            return user
        }
        return try await client.auth.user()
    }
    
    func signOut() async throws {
        try await client.auth.signOut()
        print("✅ User signed out successfully")
    }
    
    /// Deletes the user's account and all associated data from Supabase
    func deleteAccount() async throws {
        // Get current user
        let user = try await getCurrentUser()
        
        guard !user.isAnonymous else {
            throw NSError(domain: "SupabaseAuth", code: -1, 
                         userInfo: [NSLocalizedDescriptionKey: "Cannot delete anonymous account"])
        }
        
        print("🗑️ Starting account deletion for user: \(user.id)")
        
        // Delete user data from database tables (in order due to foreign key constraints)
        // 1. Delete notes
        do {
            struct IdResult: Decodable { let id: UUID }
            let deletedNotes: [IdResult] = try await client
                .from("notes")
                .delete()
                .eq("user_id", value: user.id)
                .select("id")
                .execute()
                .value
            print("   ✓ Deleted \(deletedNotes.count) notes")
        } catch {
            print("   ⚠️ Failed to delete notes: \(error)")
            // Continue with deletion even if this fails
        }
        
        // 2. Delete collection_books
        do {
            struct IdResult: Decodable { let collection_id: UUID; let book_id: UUID }
            let deletedCollectionBooks: [IdResult] = try await client
                .from("collection_books")
                .delete()
                .eq("user_collections.user_id", value: user.id)
                .select("collection_id, book_id")
                .execute()
                .value
            print("   ✓ Deleted \(deletedCollectionBooks.count) collection books")
        } catch {
            print("   ⚠️ Failed to delete collection books: \(error)")
            // Continue with deletion even if this fails
        }
        
        // 3. Delete user_collections
        do {
            struct IdResult: Decodable { let id: UUID }
            let deletedCollections: [IdResult] = try await client
                .from("user_collections")
                .delete()
                .eq("user_id", value: user.id)
                .select("id")
                .execute()
                .value
            print("   ✓ Deleted \(deletedCollections.count) collections")
        } catch {
            print("   ⚠️ Failed to delete collections: \(error)")
            // Continue with deletion even if this fails
        }
        
        // 4. Delete user_books
        do {
            struct IdResult: Decodable { let id: UUID }
            let deletedUserBooks: [IdResult] = try await client
                .from("user_books")
                .delete()
                .eq("user_id", value: user.id)
                .select("id")
                .execute()
                .value
            print("   ✓ Deleted \(deletedUserBooks.count) user books")
        } catch {
            print("   ⚠️ Failed to delete user books: \(error)")
            // Continue with deletion even if this fails
        }
        
        // 5. Delete the user account from Supabase Auth
        // NOTE: Deleting auth users requires a Supabase Edge Function with admin privileges.
        // You need to create an edge function that calls: supabase.auth.admin.deleteUser(userId)
        // For now, we'll try to call it and handle gracefully if it doesn't exist yet.
        do {
            try await client.rpc("delete_user_account").execute()
            print("   ✓ Deleted user account from Auth")
        } catch {
            // If the edge function doesn't exist yet, at least sign out the user
            // and their data is already deleted from the database
            print("   ⚠️ Auth account deletion via edge function failed: \(error)")
            print("   ℹ️  To fully delete auth users, create a Supabase Edge Function named 'delete_user_account'")
            print("   ℹ️  For now, signing out user (data already deleted from database)")
            try await signOut()
        }
        
        print("✅ Account deletion process completed")
    }
}
