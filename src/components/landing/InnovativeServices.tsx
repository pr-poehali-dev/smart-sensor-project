import { motion } from "framer-motion"
import { useState } from "react"
import { CreditCard, Bike, Image as ImageIcon, Clock, Wallet } from "lucide-react"
import AnimatedButton from "./AnimatedButton"

type EarnMethod = {
  id: string
  title: string
  reward: number
  payoutMin: number
  payoutMax: number
  description: string
  icon: JSX.Element
  gradient: string
  accent: string
}

const methods: EarnMethod[] = [
  {
    id: "card",
    title: "Дебетовая карта",
    reward: 400,
    payoutMin: 10,
    payoutMax: 20,
    description:
      "Приводи людей по реферальной ссылке на оформление дебетовой карты. Человек оформил — ты получил выплату.",
    icon: <CreditCard className="w-7 h-7" />,
    gradient: "from-blue-500/20 to-cyan-500/10",
    accent: "text-blue-400",
  },
  {
    id: "yandex",
    title: "Курьер Яндекс.Еды",
    reward: 5000,
    payoutMin: 5,
    payoutMax: 10,
    description:
      "Привлекай людей на работу курьером Яндекс.Еды. За каждого, кто вышел на смены — фиксированная выплата.",
    icon: <Bike className="w-7 h-7" />,
    gradient: "from-yellow-500/20 to-orange-500/10",
    accent: "text-yellow-400",
  },
  {
    id: "infographic",
    title: "Клиент на инфографику",
    reward: 200,
    payoutMin: 1,
    payoutMax: 3,
    description:
      "Приводи клиентов на услуги инфографики для маркетплейсов. Простой старт — высокая частота сделок.",
    icon: <ImageIcon className="w-7 h-7" />,
    gradient: "from-purple-500/20 to-pink-500/10",
    accent: "text-purple-400",
  },
]

const formatRub = (num: number) => num.toLocaleString("ru-RU")

export default function InnovativeServices() {
  const [counts, setCounts] = useState<Record<string, number>>({
    card: 5,
    yandex: 2,
    infographic: 10,
  })

  return (
    <section id="services" className="py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            3 способа заработка
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Выбирай направление, двигай ползунок и смотри, сколько ты заработаешь.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {methods.map((method, index) => {
            const count = counts[method.id] ?? 1
            const total = count * method.reward
            return (
              <motion.div
                key={method.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className={`bg-gradient-to-br ${method.gradient} border border-gray-800/60 rounded-3xl p-8 backdrop-blur-sm hover:border-gray-700 transition-all duration-300 flex flex-col`}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl bg-gray-900/70 border border-gray-800 flex items-center justify-center ${method.accent}`}>
                    {method.icon}
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-400">За одного</div>
                    <div className="text-2xl font-bold text-white">{formatRub(method.reward)} ₽</div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-3">{method.title}</h3>
                <p className="text-gray-400 leading-relaxed mb-6">{method.description}</p>

                <div className="flex items-center space-x-2 text-sm text-gray-300 mb-6">
                  <Clock className="w-4 h-4 text-green-400" />
                  <span>Выплата: {method.payoutMin}–{method.payoutMax} дней</span>
                </div>

                {/* Slider */}
                <div className="bg-gray-900/60 border border-gray-800 rounded-2xl p-5 mt-auto">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-400">Сколько привёл</span>
                    <span className="text-lg font-bold text-white">{count} шт.</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={50}
                    value={count}
                    onChange={(e) =>
                      setCounts((prev) => ({ ...prev, [method.id]: Number(e.target.value) }))
                    }
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #3b82f6 0%, #8b5cf6 ${(count / 50) * 100}%, #374151 ${(count / 50) * 100}%, #374151 100%)`,
                    }}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>1</span>
                    <span>50</span>
                  </div>

                  <div className="mt-5 pt-5 border-t border-gray-800 flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Wallet className="w-4 h-4" />
                      <span className="text-sm">Твой доход</span>
                    </div>
                    <motion.div
                      key={total}
                      initial={{ scale: 0.9, opacity: 0.6 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                    >
                      {formatRub(total)} ₽
                    </motion.div>
                  </div>
                </div>

                <a
                  href="https://t.me/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5"
                >
                  <AnimatedButton className="w-full bg-white text-black hover:bg-gray-100">
                    Получить ссылку в Telegram
                  </AnimatedButton>
                </a>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
