import { initializeApp, getApps, cert, type ServiceAccount } from "firebase-admin/app"
import { getAuth } from "firebase-admin/auth"

const serviceAccount: ServiceAccount = {
  projectId: "noteplanning-187c1",
  privateKey:
    "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCan88+PezMW4BP\n86OQO22ZEspbHW1KOLFV5TsggAuekPGh9DtWwzXF+qU7RmeL5TX+zuxaVndUyoju\nQN7NAA3OCi1iqC+LN0vvgAGMi5GQSRgNr+kKM+pHX9FsetpfVG3JySCHx86x1ve+\n5yusjYqjl4kxG4V76TTVMWNoLyO+o42TUjlOa5p0kZrpdY3hWXleTHkcLvqRVz2T\nUllrv+qOX9l/WAbB1keABfNHCgloIn4CNkb9sCQWlFbDtRWlB7Jx0CaBpzkNHAV5\nB9sOHI715Ltfkz+Xf509B9XAMoI2D2aUyfptxhmZf+/wDExLMRDJ6vznOQw5zX21\nqYQJWF1tAgMBAAECggEAHuVsZIA8qwfkj3U8O1N4npPX3dV3M1O5MZPkmOWlDLnj\nImyaF8fZXJYtAndatOQnwiLILPPmk8mFi2/oZReL6p3zfCllmKCDupc+F/6CZ02H\nsiJygxClET526wFwVYiaCG45IxB8f2IYLmvkOO4uY+phZi/c4AnU/f2IorZ6orqd\nWPep8QP5Xk9FHCYKPZkZwEpZS1prhj8TTnhyQPokSDZ3wIc7FeD0qjPg3zIRZ2cf\nDhTq7tCtlfwXnzJ51LcBBMbbnGnvRC4wORBplEgKfQ2gTP8mkU0zV5qR6OFwC+70\n5u1Sw2MgR3YUGnY23IFgShOINkb5OQvEueDSVBP4gQKBgQDVV7knYGOXEB5qvv3I\nP0DghRqNRyi3+9gigzoQjUcz1kVvxM/wKtyGCpgPWnLqlh9s1GlxEhCtZLtnYC7l\nicEJ/BZHH8GPjSKIDg+EX26TwnG7X4NPP7eoQr94Q0YxVAguEfKGylkZvw8lhYNy\nAMwQu0scfKkWG9Jc+fcY0fsPgQKBgQC5in4tW8lNVgoiDFR887Evd2TYSzRFb1Ry\n15pV2eJqWAE8ByKNkrLNLh+IA0S21uOUSmLk3vKzXfG2I3b/a7WBqgRx2TlI3dhg\nLCG+4UewuhiaYbr6MRGUsUnEf3Zr+v9IOxeUJ3ZetWSa/8QYQIIBWmo1cty4iEJ6\nBo3m6PyD7QKBgEucYo+1FrbETLNya0lcOacZJXbqwGCsjkZ1EdAp8hFKIKPjMfsh\nhbSv7oKKgO3pNMwCYDhlualqaQzTRuutLdBXGqIsfBJfZ9ymdxNoKy2NHXfV+xjM\nMVAeD/QUi70R1jBVxgnFj1yTnU+kCRkPdUN8zbsT521hgOXY5Z1TVlKBAoGAHOK1\n0CP5DAQ4IaLfyHA8BpLE7XOP2LuDXzm3umPofvvifVDzDS1ojs7+c7NmkDyWQ7Dt\nAoq/KDOY/O06intfT6eDd6IE7BY1qItWWZxDB/2A9RAABxF6ljafsGrTqe3yrnEc\ns6ENKaN93S+yfMAWPVWxMU8Hk+cKymqYzvk4zuUCgYB+vqSVb+NC31xz0NPwBKT8\nQcGULDM4wyHaT9nnuOSjET1DNO9Lv/+UdIUQ/M0WdZfyNhSfXGJ0Xhcax3tbXG6d\nD1CCsqBJDfWSyVn5kM9WTOj9Wwf6g8ULNzC684nAB4pT85vQicTEQQhmHn2Z1nB4\n6SjZTWPSFFZLR6DKDEB+mQ==\n-----END PRIVATE KEY-----\n",
  clientEmail: "firebase-adminsdk-kswrs@noteplanning-187c1.iam.gserviceaccount.com",
}

let adminAuth: ReturnType<typeof getAuth> | null = null

// Initialize Firebase Admin only on server-side
function initializeFirebaseAdmin() {
  if (typeof window !== "undefined") {
    throw new Error("Firebase Admin SDK should only be used on the server")
  }

  if (getApps().length === 0) {
    try {
      initializeApp({
        credential: cert(serviceAccount),
      })
    } catch (error) {
      console.error("Error initializing Firebase Admin:", error)
      throw error
    }
  }

  if (!adminAuth) {
    adminAuth = getAuth()
  }

  return adminAuth
}

export { initializeFirebaseAdmin }
export { adminAuth }
