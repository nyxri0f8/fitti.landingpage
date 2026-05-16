import { Resend } from "resend";
import type { VercelRequest, VercelResponse } from "@vercel/node";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("Missing RESEND_API_KEY environment variable");
    return res.status(500).json({ success: false, message: "Server configuration error." });
  }

  try {
    const formData = req.body;
    console.log("Received application:", formData);

    const htmlTemplate = `
      <div style="font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 650px; margin: 0 auto; background: #ffffff; border: 1px solid #e4e4e7; border-radius: 12px; overflow: hidden; color: #09090b; line-height: 1.5;">
        <!-- Header -->
        <div style="background: #09090b; padding: 40px; text-align: left; border-bottom: 4px solid #76b900;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 900; letter-spacing: -0.05em; text-transform: uppercase;">FITTI<span style="color: #76b900;">.</span></h1>
          <p style="color: #a1a1aa; margin: 8px 0 0 0; font-family: 'Georgia', serif; font-style: italic; font-size: 14px;">Institutional Transformation Assessment</p>
        </div>
        
        <div style="padding: 40px;">
          <!-- Section 1: Client Overview -->
          <div style="margin-bottom: 40px;">
            <h2 style="font-size: 11px; font-weight: 800; color: #76b900; text-transform: uppercase; letter-spacing: 0.2em; margin-bottom: 16px; border-bottom: 1px solid #f4f4f5; padding-bottom: 8px;">Section 01 // Client Identification</h2>
            <div style="display: flex; flex-direction: column; gap: 4px;">
              <p style="font-size: 24px; font-weight: 800; margin: 0; color: #09090b; letter-spacing: -0.02em;">${formData.fullName}</p>
              <p style="font-size: 15px; color: #71717a; margin: 0; font-family: monospace;">Primary Contact: ${formData.phone}</p>
            </div>
          </div>

          <!-- Section 2: Methodology & Objectives -->
          <div style="display: table; width: 100%; margin-bottom: 40px; border-spacing: 10px 0; margin-left: -10px;">
            <div style="display: table-cell; width: 50%; background: #f8fafc; padding: 24px; border-radius: 8px; border: 1px solid #f1f5f9;">
              <h3 style="font-size: 9px; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.15em; margin: 0 0 12px 0;">Transformation Objective</h3>
              <p style="font-size: 16px; font-weight: 700; color: #0f172a; margin: 0;">${formData.goal}</p>
            </div>
            <div style="display: table-cell; width: 50%; background: #f8fafc; padding: 24px; border-radius: 8px; border: 1px solid #f1f5f9;">
              <h3 style="font-size: 9px; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.15em; margin: 0 0 12px 0;">Selected Methodology</h3>
              <p style="font-size: 16px; font-weight: 700; color: #76b900; margin: 0;">${formData.selectedPlan || formData.planInterest}</p>
            </div>
          </div>

          <!-- Section 3: Physiological Profile -->
          <div style="margin-bottom: 40px; background: #ffffff; border: 1px solid #f4f4f5; padding: 30px; border-radius: 8px;">
            <h2 style="font-size: 11px; font-weight: 800; color: #76b900; text-transform: uppercase; letter-spacing: 0.2em; margin: 0 0 20px 0;">Section 02 // Physical Assessment</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="font-size: 13px; color: #71717a; padding: 8px 0; border-bottom: 1px solid #f4f4f5;">Age Profile</td>
                <td style="font-size: 13px; font-weight: 700; text-align: right; padding: 8px 0; border-bottom: 1px solid #f4f4f5; color: #09090b;">${formData.age} Years</td>
              </tr>
              <tr>
                <td style="font-size: 13px; color: #71717a; padding: 8px 0; border-bottom: 1px solid #f4f4f5;">Height Stature</td>
                <td style="font-size: 13px; font-weight: 700; text-align: right; padding: 8px 0; border-bottom: 1px solid #f4f4f5; color: #09090b;">${formData.height} CM</td>
              </tr>
              <tr>
                <td style="font-size: 13px; color: #71717a; padding: 8px 0; border-bottom: 1px solid #f4f4f5;">Current Mass</td>
                <td style="font-size: 13px; font-weight: 700; text-align: right; padding: 8px 0; border-bottom: 1px solid #f4f4f5; color: #09090b;">${formData.weight} KG</td>
              </tr>
              <tr>
                <td style="font-size: 13px; color: #71717a; padding: 8px 0;">Dietary Framework</td>
                <td style="font-size: 13px; font-weight: 700; text-align: right; padding: 8px 0; color: #09090b;">${formData.foodPreference}</td>
              </tr>
            </table>
          </div>

          <!-- Section 4: Clinical History -->
          <div style="margin-bottom: 40px;">
            <h2 style="font-size: 11px; font-weight: 800; color: #76b900; text-transform: uppercase; letter-spacing: 0.2em; margin: 0 0 16px 0;">Section 03 // Clinical Overview</h2>
            <div style="background: ${formData.hasMedicalCondition === "Yes" ? "#fff1f2" : "#f0fdf4"}; padding: 24px; border-radius: 8px; border: 1px solid ${formData.hasMedicalCondition === "Yes" ? "#fecdd3" : "#dcfce7"};">
              <p style="font-size: 13px; margin: 0; font-weight: 800; color: ${formData.hasMedicalCondition === "Yes" ? "#991b1b" : "#166534"}; text-transform: uppercase; letter-spacing: 0.05em;">Medical History: ${formData.hasMedicalCondition}</p>
              ${formData.medicalDescription ? `<p style="font-size: 14px; color: #7f1d1d; margin: 12px 0 0 0; line-height: 1.6;"><strong>History:</strong> ${formData.medicalDescription}</p>` : ""}
              ${formData.allergies ? `<p style="font-size: 14px; color: #7f1d1d; margin: 8px 0 0 0; line-height: 1.6;"><strong>Allergies:</strong> ${formData.allergies}</p>` : ""}
            </div>
          </div>

          <!-- Section 5: Performance Baseline -->
          <div style="margin-bottom: 40px; background: #ffffff; border: 1px solid #f4f4f5; padding: 30px; border-radius: 8px;">
            <h2 style="font-size: 11px; font-weight: 800; color: #76b900; text-transform: uppercase; letter-spacing: 0.2em; margin: 0 0 20px 0;">Section 04 // Performance Baseline</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="font-size: 13px; color: #71717a; padding: 8px 0; border-bottom: 1px solid #f4f4f5;">Facility Access</td>
                <td style="font-size: 13px; font-weight: 700; text-align: right; padding: 8px 0; border-bottom: 1px solid #f4f4f5; color: #09090b;">${formData.gymAccess}</td>
              </tr>
              <tr>
                <td style="font-size: 13px; color: #71717a; padding: 8px 0; border-bottom: 1px solid #f4f4f5;">Athletic Background</td>
                <td style="font-size: 13px; font-weight: 700; text-align: right; padding: 8px 0; border-bottom: 1px solid #f4f4f5; color: #09090b;">${formData.isSportsPerson}</td>
              </tr>
              <tr>
                <td style="font-size: 13px; color: #71717a; padding: 8px 0;">Experience Level</td>
                <td style="font-size: 13px; font-weight: 700; text-align: right; padding: 8px 0; color: #09090b;">${formData.workoutExperience}</td>
              </tr>
            </table>
          </div>

          <!-- Section 6: Operational Deployment -->
          <div style="background: #f4f4f5; padding: 30px; border-radius: 8px; border: 1px solid #e4e4e7;">
            <h2 style="font-size: 11px; font-weight: 800; color: #09090b; text-transform: uppercase; letter-spacing: 0.2em; margin: 0 0 16px 0;">Operational Deployment</h2>
            <p style="font-size: 12px; color: #71717a; margin: 0; text-transform: uppercase; letter-spacing: 0.05em;">Geographic Node:</p>
            <p style="font-size: 20px; font-weight: 800; margin: 4px 0 0 0; color: #09090b;">${formData.location}</p>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="background: #fafafa; padding: 30px; text-align: center; border-top: 1px solid #f4f4f5;">
          <p style="font-size: 10px; color: #a1a1aa; text-transform: uppercase; letter-spacing: 0.1em; margin: 0 0 12px 0;">System Generated Assessment // ${new Date().toLocaleString()}</p>
          <div style="font-size: 9px; color: #d4d4d8; line-height: 1.4; max-width: 450px; margin: 0 auto;">
            CONFIDENTIALITY NOTICE: This transmission is intended only for the use of the individual or entity to which it is addressed and contains information that is privileged and confidential.
          </div>
        </div>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: "Fitti Platform <onboarding@resend.dev>",
      to: "nyx4122006@gmail.com",
      subject: `[FITTI] New Application: ${formData.fullName}`,
      html: htmlTemplate,
    });

    if (error) {
      console.error("Resend Error:", error);
      return res.status(500).json({ success: false, message: error.message });
    }

    console.log("Transmission sent successfully via Resend:", data?.id);
    return res.status(200).json({ success: true, message: "Application sent successfully!" });
  } catch (error) {
    console.error("Error processing application:", error);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
}
