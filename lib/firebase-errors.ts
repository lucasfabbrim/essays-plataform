export function getFirebaseErrorMessage(error: any): string {
  const errorCode = error?.code || ""
  const errorMessage = error?.message || ""

  // Map Firebase error codes to user-friendly Portuguese messages
  const errorMap: Record<string, string> = {
    // Auth errors
    "auth/invalid-email": "Email inválido. Verifique o formato do email.",
    "auth/user-disabled": "Esta conta foi desabilitada. Entre em contato com o suporte.",
    "auth/user-not-found": "Email ou senha incorretos.",
    "auth/wrong-password": "Email ou senha incorretos.",
    "auth/invalid-credential": "Email ou senha incorretos.",
    "auth/email-already-in-use": "Este email já está cadastrado. Tente fazer login.",
    "auth/weak-password": "Senha muito fraca. Use no mínimo 6 caracteres.",
    "auth/too-many-requests": "Muitas tentativas. Tente novamente mais tarde.",
    "auth/network-request-failed": "Erro de conexão. Verifique sua internet.",
    "auth/operation-not-allowed": "Operação não permitida. Entre em contato com o suporte.",
    "auth/requires-recent-login": "Por segurança, faça login novamente.",
    "auth/invalid-login-credentials": "Email ou senha incorretos.",
    "auth/missing-password": "Por favor, informe sua senha.",
    "auth/missing-email": "Por favor, informe seu email.",
  }

  // Return mapped message or default
  if (errorCode && errorMap[errorCode]) {
    return errorMap[errorCode]
  }

  // Check for common error messages in the error string
  if (errorMessage.includes("Invalid login credentials")) {
    return "Email ou senha incorretos."
  }
  if (errorMessage.includes("Email not confirmed")) {
    return "Por favor, confirme seu email antes de fazer login."
  }
  if (errorMessage.includes("User already registered")) {
    return "Este email já está cadastrado. Tente fazer login."
  }

  // Default error message
  return "Erro ao processar sua solicitação. Tente novamente."
}
