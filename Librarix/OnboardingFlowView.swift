import SwiftUI
import SafariServices

struct OnboardingFlowView: View {
	enum Step: Int {
		case welcome
		case profile
		case done
	}

	@Environment(\.colorScheme) private var colorScheme
	@ObservedObject private var auth = SupabaseAuthManager.shared
	@StateObject private var appleSignIn = AppleSignInCoordinator()

	let onComplete: (String) -> Void

	@State private var step: Step = .welcome
	@State private var name: String = ""
	@State private var isSigningIn = false
	@State private var signInError: String?
	@State private var showingSafariView = false
	@State private var googleSignInURL: URL?

	private var background: Color { colorScheme == .dark ? .lxBackgroundDark : .lxBackgroundLight }
	private var surface: Color { colorScheme == .dark ? .lxSurfaceDark : .white }
	private var border: Color { colorScheme == .dark ? .lxBorderDark : .lxBorderLight }

	private var cleanedName: String {
		name.trimmingCharacters(in: .whitespacesAndNewlines)
	}

	private var isNameValid: Bool {
		cleanedName.count >= 2
	}

	var body: some View {
		ZStack {
			background.ignoresSafeArea()

			VStack(spacing: 18) {
				topProgress

				ZStack {
					switch step {
					case .welcome:
						welcomeStep
							.transition(.asymmetric(insertion: .move(edge: .trailing).combined(with: .opacity), removal: .move(edge: .leading).combined(with: .opacity)))
					case .profile:
						profileStep
							.transition(.asymmetric(insertion: .move(edge: .trailing).combined(with: .opacity), removal: .move(edge: .leading).combined(with: .opacity)))
					case .done:
						doneStep
							.transition(.asymmetric(insertion: .move(edge: .trailing).combined(with: .opacity), removal: .move(edge: .leading).combined(with: .opacity)))
					}
				}
				.animation(.easeInOut(duration: 0.28), value: step)
			}
			.padding(.horizontal, 18)
			.padding(.top, 18)
			.padding(.bottom, 20)
		}
		.sheet(isPresented: $showingSafariView) {
			SafariView(url: googleSignInURL ?? URL(string: "https://google.com")!)
				.onOpenURL { handledURL in
					Task {
						await auth.handleAuthCallback(handledURL)
						await MainActor.run {
							showingSafariView = false
						}
					}
				}
				.onDisappear {
					showingSafariView = false
				}
		}
	}

	private var topProgress: some View {
		HStack(spacing: 8) {
			ForEach(0..<3, id: \.self) { idx in
				Capsule()
					.fill(idx <= step.rawValue ? Color.lxPrimary : Color.lxTextSecondary.opacity(0.25))
					.frame(height: 6)
			}
		}
	}

	private var welcomeStep: some View {
		VStack(spacing: 20) {
			Spacer(minLength: 8)

			Image("AppLogo")
				.resizable()
				.scaledToFit()
				.frame(width: 100, height: 100)
				.clipShape(RoundedRectangle(cornerRadius: 22, style: .continuous))

			VStack(spacing: 8) {
				Text("Welcome to Librarix")
					.font(.system(size: 30, weight: .heavy, design: .rounded))
					.foregroundStyle(colorScheme == .dark ? .white : Color.black.opacity(0.92))
					.multilineTextAlignment(.center)

				Text("Track your reading, keep your notes, and build momentum every day.")
					.font(.system(size: 15, weight: .medium))
					.foregroundStyle(Color.lxTextSecondary)
					.multilineTextAlignment(.center)
			}

			Spacer(minLength: 0)

			Button("Get Started") {
				withAnimation(.easeInOut(duration: 0.28)) {
					step = .profile
				}
			}
			.font(.system(size: 16, weight: .bold))
			.frame(maxWidth: .infinity)
			.frame(height: 52)
			.background(Color.lxPrimary)
			.foregroundStyle(.white)
			.clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
		}
		.padding(20)
		.background(cardBackground)
	}

	private var profileStep: some View {
		VStack(spacing: 18) {
			VStack(alignment: .leading, spacing: 8) {
				Text("Set up your profile")
					.font(.system(size: 24, weight: .bold))
					.foregroundStyle(colorScheme == .dark ? .white : Color.black.opacity(0.92))

				Text("Choose how your name appears in the app.")
					.font(.system(size: 14, weight: .medium))
					.foregroundStyle(Color.lxTextSecondary)
			}
			.frame(maxWidth: .infinity, alignment: .leading)

			VStack(alignment: .leading, spacing: 6) {
				Text("NAME")
					.font(.system(size: 11, weight: .bold))
					.tracking(1.1)
					.foregroundStyle(Color.lxTextSecondary)

				TextField("Your name", text: $name)
					.textInputAutocapitalization(.words)
					.disableAutocorrection(true)
					.font(.system(size: 16, weight: .medium))
					.padding(.horizontal, 12)
					.frame(height: 48)
					.background(surface)
					.clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
					.overlay(
						RoundedRectangle(cornerRadius: 14, style: .continuous)
							.stroke(border, lineWidth: 1)
					)

				if !name.isEmpty && !isNameValid {
					Text("Name must be at least 2 characters.")
						.font(.system(size: 12, weight: .medium))
						.foregroundStyle(.red)
				}
			}

			VStack(spacing: 10) {
				Button {
					guard isNameValid else { return }
					withAnimation(.easeInOut(duration: 0.28)) {
						step = .done
					}
				} label: {
					Text("Continue as Guest")
						.font(.system(size: 16, weight: .bold))
						.frame(maxWidth: .infinity)
						.frame(height: 52)
						.background(isNameValid ? Color.lxPrimary : Color.lxPrimary.opacity(0.35))
						.foregroundStyle(.white)
						.clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
				}
				.buttonStyle(.plain)
				.disabled(!isNameValid)
				
				// Sign in with Apple
				Button {
					appleSignIn.signIn()
				} label: {
					HStack(spacing: 8) {
						if appleSignIn.isSigningIn {
							ProgressView().tint(colorScheme == .dark ? .white : .black)
						} else {
							Image(systemName: "apple.logo")
								.font(.system(size: 16, weight: .semibold))
						}
						Text(appleSignIn.isSigningIn ? "Signing in..." : "Sign in with Apple")
							.font(.system(size: 15, weight: .semibold))
					}
					.frame(maxWidth: .infinity)
					.frame(height: 48)
					.background(colorScheme == .dark ? Color.white.opacity(0.08) : Color.black.opacity(0.05))
					.foregroundStyle(colorScheme == .dark ? .white : Color.black.opacity(0.92))
					.clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
				}
				.buttonStyle(.plain)
				.disabled(appleSignIn.isSigningIn)
				
				// Sign in with Google (using SafariView)
				Button {
					Task {
						isSigningIn = true
						signInError = nil
						do {
							googleSignInURL = try await auth.getGoogleSignInURL()
							showingSafariView = true
						} catch {
							signInError = "Could not start Google sign-in. Try again."
						}
						isSigningIn = false
					}
				} label: {
					HStack(spacing: 8) {
						if isSigningIn {
							ProgressView().tint(colorScheme == .dark ? .white : .black)
						} else {
							Image(systemName: "g.circle.fill")
								.font(.system(size: 16, weight: .semibold))
						}
						Text(isSigningIn ? "Opening..." : "Sign in with Google")
							.font(.system(size: 15, weight: .semibold))
					}
					.frame(maxWidth: .infinity)
					.frame(height: 48)
					.background(colorScheme == .dark ? Color.white.opacity(0.08) : Color.black.opacity(0.05))
					.foregroundStyle(colorScheme == .dark ? .white : Color.black.opacity(0.92))
					.clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
				}
				.buttonStyle(.plain)

				if let signInError {
					Text(signInError)
						.font(.system(size: 12, weight: .medium))
						.foregroundStyle(.red)
				}
				
				if let appleError = appleSignIn.error {
					Text(appleError)
						.font(.system(size: 12, weight: .medium))
						.foregroundStyle(.red)
				}
			}

			Spacer(minLength: 0)
		}
		.padding(20)
		.background(cardBackground)
	}

	private var doneStep: some View {
		VStack(spacing: 18) {
			Spacer(minLength: 8)

			Image(systemName: "checkmark.seal.fill")
				.font(.system(size: 42, weight: .bold))
				.foregroundStyle(.green)

			VStack(spacing: 8) {
				Text("You are all set, \(cleanedName)")
					.font(.system(size: 26, weight: .heavy, design: .rounded))
					.foregroundStyle(colorScheme == .dark ? .white : Color.black.opacity(0.92))
					.multilineTextAlignment(.center)

				Text("Your profile is ready. Start reading and tracking your progress.")
					.font(.system(size: 14, weight: .medium))
					.foregroundStyle(Color.lxTextSecondary)
					.multilineTextAlignment(.center)
			}

			Spacer(minLength: 0)

			Button("Start Reading") {
				onComplete(cleanedName)
			}
			.font(.system(size: 16, weight: .bold))
			.frame(maxWidth: .infinity)
			.frame(height: 52)
			.background(Color.lxPrimary)
			.foregroundStyle(.white)
			.clipShape(RoundedRectangle(cornerRadius: 14, style: .continuous))
		}
		.padding(20)
		.background(cardBackground)
	}

	private var cardBackground: some View {
		RoundedRectangle(cornerRadius: 22, style: .continuous)
			.fill(surface)
			.overlay(
				RoundedRectangle(cornerRadius: 22, style: .continuous)
					.stroke(border, lineWidth: 1)
			)
	}

}

#Preview {
	OnboardingFlowView { _ in }
}

