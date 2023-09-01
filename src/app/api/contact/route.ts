import { redirect } from "next/navigation";

export async function GET() {
  redirect(`mailto:${process.env.CONTACT_EMAIL}`);
}
