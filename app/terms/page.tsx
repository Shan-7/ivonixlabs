"use client"

import { motion } from "framer-motion"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import AnimatedBackground from "@/components/animated-background"

export default function Terms() {
  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <Navbar />
      <main className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="prose prose-invert max-w-4xl mx-auto glass-card p-8 rounded-lg"
        >
          <h1>Terms of Use</h1>

          <h2>1. Services</h2>
          <p>
            Ivonix Labs provides electronics design, software development, and 3D printing services. By using our
            services, you agree to these terms and conditions.
          </p>

          <h2>2. Intellectual Property</h2>
          <p>
            All intellectual property rights in designs, software, and other deliverables created by Ivonix Labs remain
            with Ivonix Labs until full payment is received, after which specified rights transfer according to the
            project agreement.
          </p>

          <h2>3. 3D Printing Services</h2>
          <p>
            3.1. File Requirements: All submitted 3D files must be in STL format and meet our technical specifications.
            <br />
            3.2. Quality: While we strive for the highest quality, minor variations are inherent in 3D printing.
            <br />
            3.3. Intellectual Property Rights: Customers must own or have rights to print submitted designs.
          </p>

          <h2>4. Project Terms</h2>
          <p>
            4.1. Project Scope: All projects will be clearly defined in a written agreement before commencement.
            <br />
            4.2. Timeline: Project timelines are estimates and may be subject to change based on complexity and
            revisions.
            <br />
            4.3. Revisions: Two rounds of revisions are included in the project cost. Additional revisions may incur
            extra charges.
            <br />
            4.4. Intellectual Property: Unless otherwise specified, the client retains rights to the final product upon
            full payment.
            <br />
            4.5. Confidentiality: We maintain strict confidentiality regarding all client projects and information.
          </p>

          <h2>5. Payment Terms</h2>
          <p>
            5.1. Pricing is provided via quote and may vary based on project requirements.
            <br />
            5.2. Payment schedules will be outlined in project proposals.
            <br />
            5.3. All prices are subject to change without notice.
          </p>

          <h2>6. Warranty and Liability</h2>
          <p>
            6.1. Services are provided "as is" without warranty of any kind.
            <br />
            6.2. Ivonix Labs is not liable for any indirect or consequential damages.
            <br />
            6.3. Maximum liability is limited to the amount paid for the specific service.
          </p>

          <h2>7. Confidentiality</h2>
          <p>
            We maintain strict confidentiality of all client information and projects. Detailed terms are provided in
            our NDA, available upon request.
          </p>

          <h2>8. Modifications</h2>
          <p>
            We reserve the right to modify these terms at any time. Continued use of our services constitutes acceptance
            of modified terms.
          </p>

          <p className="text-sm text-gray-400 mt-8">
            Last updated: January 2024
            <br />
            Contact us at legal@ivonixlabs.com for any questions regarding these terms.
          </p>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
