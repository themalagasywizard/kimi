import SwiftUI
import AuthenticationServices

/// Coordinator to bridge ASAuthorizationControllerDelegate with SwiftUI
class AppleSignInCoordinator: NSObject, ObservableObject {
    private let helper = AppleSignInHelper()
    
    @Published var isSigningIn = false
    @Published var error: String?
    
    func signIn() {
        isSigningIn = true
        error = nil
        
        helper.startSignIn { [weak self] result in
            DispatchQueue.main.async {
                self?.isSigningIn = false
                
                switch result {
                case .success(let tokens):
                    // TODO: Send idToken to Supabase to complete sign-in
                    // For now, this demonstrates the Apple Sign-In flow is working
                    print("✅ Apple Sign-In successful, idToken received")
                    // Call SupabaseAuthManager to complete the sign-in with Apple
                    Task {
                        try? await SupabaseAuthManager.shared.signInWithApple(idToken: tokens.idToken, nonce: tokens.nonce)
                    }
                case .failure(let err):
                    self?.error = err.localizedDescription
                    print("❌ Apple Sign-In failed: \(err)")
                }
            }
        }
    }
}

// MARK: - ASAuthorizationControllerPresentationContextProviding
extension AppleSignInCoordinator: ASAuthorizationControllerPresentationContextProviding {
    func presentationAnchor(for controller: ASAuthorizationController) -> ASPresentationAnchor {
        let scenes = UIApplication.shared.connectedScenes
        let windowScene = scenes.first { $0.activationState == .foregroundActive } as? UIWindowScene
        let window = windowScene?.windows.first { $0.isKeyWindow }
        return window ?? ASPresentationAnchor()
    }
}
