
# 🚀 TalentKonnect – Micro-Task Marketplace

**[Preview here](https://talentkonnect.vercel.app/)**

---

## 🧠 Project Overview

**TalentKonnect** is a gamified micro-task marketplace that turns everyday expertise into credits and raffle entries. It connects hidden at-home talents with brands and peers for 5–15 min gigs, tip sharing, and skill-based community engagement.

> 💡 Post a tip → Earn a credit → Redeem or enter a raffle

---

## 📦 Tech Stack

- ⚡ **Vite** + **React** + **TypeScript**
- 🎨 **TailwindCSS v3**
- 🧩 **shadcn/ui** component library
- 🔐 RESTful API integrations (mocked)
- 📍 Deployed on [Vercel](https://vercel.com)

---

## 🔧 Setup Instructions

### 1. Create React App using Vite + TypeScript

```bash
npm create vite@latest talentkonnect -- --template react-ts
cd talentkonnect
```

---

### 2. Install TailwindCSS & Required Plugins

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Update `tailwind.config.cjs`:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Replace `src/index.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

### 3. Install shadcn/ui

```bash
npm install @radix-ui/react-icons class-variance-authority tailwind-variants lucide-react
npx shadcn@latest init
```

Follow prompts and use:
- **Tailwind CSS** as styling method
- **Default paths**
- **Neutral** as base color

Then add components:
```bash
npx shadcn@latest add button
```

---

### 4. Setup Path Aliases

Install types:
```bash
npm install -D @types/node
```

Edit `vite.config.ts`:

```ts
import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

Update `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

---

## 🧩 Module 1: Onboarding + Tip Submission

```tsx
// src/pages/Onboarding.tsx
import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function Onboarding() {
  const [form, setForm] = useState({ name: "", phone: "", category: "", tip: "" })
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // API POST request (mocked)
    await fetch("/api/users", { method: "POST", body: JSON.stringify(form) })
    await fetch("/api/credits", { method: "POST", body: JSON.stringify({ credits: 1 }) })
    setSuccess(true)
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Join TalentKonnect</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="border w-full p-2" required placeholder="Your Name" onChange={e => setForm({ ...form, name: e.target.value })} />
        <input className="border w-full p-2" required placeholder="Phone / WhatsApp" onChange={e => setForm({ ...form, phone: e.target.value })} />
        <select className="border w-full p-2" required onChange={e => setForm({ ...form, category: e.target.value })}>
          <option value="">Select Category</option>
          <option value="Cooking Hack">Cooking Hack</option>
          <option value="Study Tip">Study Tip</option>
          <option value="Repair Trick">Repair Trick</option>
        </select>
        <input className="border w-full p-2" required placeholder="Your Tip" onChange={e => setForm({ ...form, tip: e.target.value })} />
        <Button type="submit">Submit Tip</Button>
      </form>
      {success && <p className="mt-4 text-green-600 font-semibold">+1 Credit! 🎉</p>}
    </div>
  )
}
```

---

## 💳 Module 2: Credit Wallet & Ledger

```tsx
// src/pages/Wallet.tsx
import { useEffect, useState } from "react"

export default function Wallet() {
  const [balance, setBalance] = useState(0)
  const [ledger, setLedger] = useState([])

  useEffect(() => {
    fetch("/api/credits/balance").then(res => res.json()).then(data => setBalance(data.balance))
    fetch("/api/credits/history").then(res => res.json()).then(data => setLedger(data.entries))
  }, [])

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-semibold mb-2">You have {balance} credits</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Date</th>
            <th className="p-2 text-left">Source</th>
            <th className="p-2 text-left">Credits</th>
          </tr>
        </thead>
        <tbody>
          {ledger.map((entry: any, idx) => (
            <tr key={idx}>
              <td className="p-2">{entry.date}</td>
              <td className="p-2">{entry.source}</td>
              <td className="p-2">{entry.credits}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
```

---

## 🖼 Brand Guidelines

| Element      | Spec                                  |
|--------------|----------------------------------------|
| Wordmark     | `talent` in **#1D3557**, `konnect` in **#E76F51** |
| Typography   | Headlines: Montserrat, UI: Inter, Body: Lora |
| Colors       | Blue `#1D3557`, Orange `#E76F51`, Light `#F1FAEE`, Dark `#2A2D34` |
| Icon Style   | Interlocking T & K, spark shape        |
| Buttons      | Rounded (8px), solid orange or outlined blue |
| Images       | Hands-on activities, flat tools, natural light |

---

## 📬 Submission

- **Name**: Shadab Ahmad  
- **Email**: ahmad8shadab@gmail.com  
- **Phone**: +91 6201139223  
- **GitHub**: [@ahmad2shadab](https://github.com/ahmad2shadab)  
- **Preview**: [TalentKonnect on Vercel](https://talentkonnect.vercel.app/)

---

> “Got a tip? Share it—every voice counts.”

Let’s connect talents to the world—one credit at a time!.
