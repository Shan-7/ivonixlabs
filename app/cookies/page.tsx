"use client"

import { motion } from "framer-motion"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import AnimatedBackground from "@/components/animated-background"

export default function CookiePolicy() {
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
          <h1>Cookie Policy</h1>

          <p>Last updated: [Current Date]</p>

          <h2>1. What are cookies?</h2>
          <p>
            Cookies are small text files that are placed on your computer or mobile device when you visit a website.
            They are widely used to make websites work more efficiently and provide information to the owners of the
            site.
          </p>

          <h2>2. How we use cookies</h2>
          <p>We use cookies for a variety of reasons, including:</p>
          <ul>
            <li>To make our website work as you'd expect</li>
            <li>To remember your settings during and between visits</li>
            <li>To improve the speed/security of the site</li>
            <li>To allow you to share pages with social networks</li>
            <li>To continuously improve our website for you</li>
            <li>To make our marketing more efficient</li>
          </ul>

          <h2>3. The types of cookies we use</h2>
          <p>We use the following types of cookies:</p>
          <ul>
            <li>Strictly Necessary Cookies: These are cookies that are required for the operation of our website.</li>
            <li>
              Analytical/Performance Cookies: They allow us to recognize and count the number of visitors and to see how
              visitors move around our website when they are using it.
            </li>
            <li>Functionality Cookies: These are used to recognize you when you return to our website.</li>
            <li>
              Targeting Cookies: These cookies record your visit to our website, the pages you have visited and the
              links you have followed.
            </li>
          </ul>

          <h2>4. How to control cookies</h2>
          <p>
            You can control and/or delete cookies as you wish. You can delete all cookies that are already on your
            computer and you can set most browsers to prevent them from being placed. If you do this, however, you may
            have to manually adjust some preferences every time you visit a site and some services and functionalities
            may not work.
          </p>

          <h2>5. More information</h2>
          <p>
            For more information about cookies and how to manage them, visit{" "}
            <a href="https://www.aboutcookies.org/">www.aboutcookies.org</a>.
          </p>

          <h2>6. Changes to our cookie policy</h2>
          <p>
            We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new
            Cookie Policy on this page.
          </p>

          <h2>7. Contact us</h2>
          <p>If you have any questions about our Cookie Policy, please contact us at:</p>
          <p>
            Email: privacy@bricklabs.com
            <br />
            Address: [Your Company Address]
          </p>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
