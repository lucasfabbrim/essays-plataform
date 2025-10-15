import { auth } from "./firebase"

export interface Order {
  id: string
  externalId: string
  quantity: number
  paidAmount: number
  methodPayment: string
  customerId: string
  createdAt: string
  productName: string
  formattedAmount: string
  formattedPaymentMethod: string
  formattedDate: string
}

export interface OrdersResponse {
  success: boolean
  data: Order[]
}

export interface EssayEvaluation {
  id: string
  customerId: string
  evaluation: {
    grammarErrors: number
    punctuationIssues: number
    cohesionScore: number
    coherenceScore: number
    argumentationScore: number
    deviationsByCompetence: {
      comp1: number
      comp2: number
      comp3: number
      comp4: number
      comp5: number
    }
    scoreByCompetence: {
      comp1: number
      comp2: number
      comp3: number
      comp4: number
      comp5: number
    }
    totalScore: number
    feedbackComments: string[]
    commentedReview: string
  }
  createdAt: string
}

export interface EvaluateEssayRequest {
  customerId: string
  essayText: string
}

export interface EvaluateEssayResponse {
  success: boolean
  data: EssayEvaluation
}

export interface CustomerProfile {
  id: string
  name: string
  email: string
  phone?: string
  birthDate?: string
  bio?: string
  photoUrl?: string
  createdAt: string
}

export interface CustomerProfileResponse {
  success: boolean
  data: CustomerProfile
}

export interface MyEssay {
  id: string
  customerId: string
  evaluation: {
    title: string
    detectedTheme: string
    isOnTopic: boolean
    wordCount: number
    paragraphCount: number
    connectorCount: number
    grammarErrors: number
    punctuationIssues: number
    spellingErrors: number
    agreementErrors: number
    informalExpressions: string[]
    highlightedText: string
    deviationList: Array<{
      type: string
      description: string
      suggestion: string
    }>
    cohesionScore: number
    coherenceScore: number
    argumentationScore: number
    deviationsByCompetence: {
      comp1: number
      comp2: number
      comp3: number
      comp4: number
      comp5: number
    }
    scoreByCompetence: {
      comp1: number
      comp2: number
      comp3: number
      comp4: number
      comp5: number
    }
    totalScore: number
    feedbackComments: string[]
    commentedReview: string
    summary: string
  }
  createdAt: string
}

export interface MyEssaysResponse {
  success: boolean
  data: MyEssay[]
}

const API_BASE_URL = "https://api-jx5sumy2za-uc.a.run.app/v1"

export async function fetchCustomerOrders(): Promise<Order[]> {
  try {
    const user = auth.currentUser
    if (!user) {
      throw new Error("Usuário não autenticado")
    }

    const token = await user.getIdToken()

    const response = await fetch(`${API_BASE_URL}/customers/orders`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })

    console.log("TOKEN: " + token)

    if (!response.ok) {
      const errorBody = await response.text()
      console.warn(`API returned ${response.status}: ${errorBody}, using mock data`)
      return getMockOrders()
    }

    const result: OrdersResponse = await response.json()

    if (!result.success) {
      console.warn("API returned success: false, using mock data")
      return getMockOrders()
    }

    // Format orders with display fields
    return result.data.map((order) => ({
      ...order,
      productName: getProductName(order.externalId),
      formattedAmount: formatAmount(order.paidAmount),
      formattedPaymentMethod: formatPaymentMethod(order.methodPayment),
      formattedDate: formatDate(order.createdAt),
    }))
  } catch (error) {
    console.error("Error fetching orders:", error)
    return getMockOrders()
  }
}

export const getCustomerOrders = fetchCustomerOrders

export function getProductName(externalId: string): string {
  const productMap: Record<string, string> = {
    main: "Plano Principal",
    combo: "Combo Premium",
    credits_5: "Pacote de 5 Créditos",
    credits_10: "Pacote de 10 Créditos",
    credits_20: "Pacote de 20 Créditos",
    premium_monthly: "Premium Mensal",
    premium_yearly: "Premium Anual",
  }

  return productMap[externalId] || externalId
}

export function formatPaymentMethod(method: string): string {
  const methodMap: Record<string, string> = {
    PIX: "PIX",
    CREDIT_CARD: "Cartão de Crédito",
    DEBIT_CARD: "Cartão de Débito",
    BOLETO: "Boleto",
  }

  return methodMap[method] || method
}

function formatAmount(amount: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount / 100) // Assuming amount is in cents
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}

export async function evaluateEssay(essayText: string): Promise<EssayEvaluation> {
  try {
    const user = auth.currentUser
    if (!user) {
      throw new Error("Usuário não autenticado")
    }

    const token = await user.getIdToken()
    const uid = user.uid

    const requestBody: EvaluateEssayRequest = {
      customerId: uid,
      essayText: essayText,
    }

    const response = await fetch(`${API_BASE_URL}/essays/evaluate`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })

    if (!response.ok) {
      throw new Error(`Erro ao avaliar redação: ${response.statusText}`)
    }

    const result: EvaluateEssayResponse = await response.json()

    if (!result.success) {
      throw new Error("Erro ao avaliar redação")
    }

    return result.data
  } catch (error) {
    console.error("Error evaluating essay:", error)
    throw error
  }
}

export async function getEssayEvaluations(): Promise<EssayEvaluation[]> {
  try {
    const user = auth.currentUser
    if (!user) {
      throw new Error("Usuário não autenticado")
    }

    const token = await user.getIdToken()

    const response = await fetch(`${API_BASE_URL}/essays/evaluations`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Erro ao buscar avaliações: ${response.statusText}`)
    }

    const result = await response.json()

    if (!result.success) {
      throw new Error("Erro ao buscar avaliações")
    }

    return result.data || []
  } catch (error) {
    console.error("Error fetching evaluations:", error)
    return []
  }
}

export async function getCustomerProfile(): Promise<CustomerProfile> {
  try {
    const user = auth.currentUser
    if (!user) {
      throw new Error("Usuário não autenticado")
    }

    const token = await user.getIdToken()

    const response = await fetch(`${API_BASE_URL}/customers/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const errorBody = await response.text()
      throw new Error(`Erro ao buscar perfil: ${errorBody}`)
    }

    const result: CustomerProfileResponse = await response.json()

    if (!result.success) {
      throw new Error("Erro ao buscar perfil")
    }

    return result.data
  } catch (error) {
    console.error("Error fetching customer profile:", error)
    throw error
  }
}

export async function getMyEssays(): Promise<MyEssay[]> {
  try {
    const user = auth.currentUser
    if (!user) {
      throw new Error("Usuário não autenticado")
    }

    const token = await user.getIdToken()

    const response = await fetch(`${API_BASE_URL}/essays/my-essays`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Erro ao buscar redações: ${response.statusText}`)
    }

    const result: MyEssaysResponse = await response.json()

    if (!result.success) {
      throw new Error("Erro ao buscar redações")
    }

    return result.data || []
  } catch (error) {
    console.error("Error fetching my essays:", error)
    return []
  }
}

export async function deleteEssay(essayId: string): Promise<boolean> {
  try {
    const user = auth.currentUser
    if (!user) {
      throw new Error("Usuário não autenticado")
    }

    const token = await user.getIdToken()

    const response = await fetch(`${API_BASE_URL}/essays/${essayId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Erro ao excluir redação: ${response.statusText}`)
    }

    return true
  } catch (error) {
    console.error("Error deleting essay:", error)
    return false
  }
}

function getMockOrders(): Order[] {
  const now = new Date().toISOString()
  return [
    {
      id: "mock_1",
      externalId: "main",
      quantity: 1,
      paidAmount: 10000,
      methodPayment: "PIX",
      customerId: "mock_customer",
      createdAt: now,
      productName: getProductName("main"),
      formattedAmount: formatAmount(10000),
      formattedPaymentMethod: formatPaymentMethod("PIX"),
      formattedDate: formatDate(now),
    },
    {
      id: "mock_2",
      externalId: "credits_10",
      quantity: 1,
      paidAmount: 5000,
      methodPayment: "CREDIT_CARD",
      customerId: "mock_customer",
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      productName: getProductName("credits_10"),
      formattedAmount: formatAmount(5000),
      formattedPaymentMethod: formatPaymentMethod("CREDIT_CARD"),
      formattedDate: formatDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()),
    },
  ]
}
