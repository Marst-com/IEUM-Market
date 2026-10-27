export type MarketMode = "market" | "local";

export type User = {
  id: string;
  nickname: string;
  email: string;
  balance: number;
  location: string;
  createdAt: string;
};

export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  mode: MarketMode;
  condition: string;
  imageUrl: string;
  sellerId: string;
  sellerName: string;
  location: string;
  status: "available" | "reserved" | "sold" | "hidden";
  createdAt: string;
  likes: number;
};

export type Order = {
  id: string;
  productId: string;
  buyerId: string;
  sellerId: string;
  price: number;
  status: "pending" | "paid" | "shipped" | "completed" | "cancelled";
  createdAt: string;
};

export type ReportReason =
  | "상품 미지급"
  | "사기 의심"
  | "허위·과장 정보"
  | "저작권 침해"
  | "부적절한 콘텐츠"
  | "기타";

export type Report = {
  id: string;
  productId: string;
  reason: ReportReason;
  detail: string;
  status: "pending" | "reviewing" | "resolved" | "rejected";
  createdAt: string;
};

export type ChatMessage = {
  id: string;
  roomId: string;
  senderId: string;
  text: string;
  createdAt: string;
};

export type ApiError = {
  message: string;
  status?: number;
};
