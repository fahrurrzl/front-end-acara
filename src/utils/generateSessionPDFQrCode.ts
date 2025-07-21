import QRCode from "qrcode";
import { generateSessionLink } from "./generateSessionLink";
import { Locales } from "@/types/Locale";

export const generateSessionPDFQrCode = async (
  voucherId: string,
): Promise<string> => {
  const link = generateSessionLink(voucherId);
  return await QRCode.toDataURL(link, {
    errorCorrectionLevel: "H",
  });
};
