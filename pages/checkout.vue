<template>
  <UiContainer class="py-24">
    <h1 class="text-2xl font-bold mb-6">Finalizar Compra</h1>

    <div class="grid md:grid-cols-2 gap-8">
      <form @submit.prevent="submit" class="space-y-4">
        <input
          v-model="name"
          type="text"
          placeholder="Nome Completo"
          :class="{
            input: true,
            'input-error': submitted && errors.name,
          }"
        />

        <div class="flex gap-4">
          <input
            v-model="cpf"
            v-mask="'###.###.###-##'"
            placeholder="CPF"
            :class="{
              input: true,
              'input-error': submitted && errors.cpf,
            }"
          />
          <input
            v-model="phone"
            v-mask="'(##) #####-####'"
            placeholder="Celular"
            :class="{
              input: true,
              'input-error': submitted && errors.phone,
            }"
          />
        </div>

        <input
          v-model="email"
          type="email"
          placeholder="E-mail"
          :class="{
            input: true,
            'input-error': submitted && errors.email,
          }"
        />

        <div class="flex gap-4">
          <input
            v-model="cep"
            v-mask="'#####-###'"
            placeholder="CEP"
            :class="{
              input: true,
              'input-error': submitted && errors.cep,
            }"
            @blur="fechtAddress"
          />

          <input
            v-model="street"
            type="text"
            placeholder="Endereço"
            class="input"
            :disabled="cepStatus === 'success'"
          />
        </div>
        <transition name="fade">
          <p v-if="cepStatus === 'success'" class="text-sm text-green-500 mt-1">
            Endereço preenchido automaticamente.
          </p>
        </transition>

        <transition name="fade">
          <p v-if="cepStatus === 'error'" class="text-sm text-red-500 mt-1">
            CEP inválido ou não encontrado.
          </p>
        </transition>

        <div class="flex gap-4">
          <input
            v-model="city"
            type="text"
            placeholder="Cidade"
            class="input"
            :disabled="cepStatus === 'success'"
          />
          <input
            v-model="state"
            type="text"
            placeholder="Estado"
            class="input"
            :disabled="cepStatus === 'success'"
          />
        </div>
      </form>

      <div>
        <ul class="space-y-3 mb-6">
          <li
            v-for="item in cart.items"
            :key="item.id"
            class="flex items-center justify-between gap-4"
          >
            <img
              :src="`https://image.tmdb.org/t/p/w92${item.poster}`"
              class="w-12 h-16 rounded object-cover"
            />
            <p class="flex-1 text-sm text-light">{{ item.title }}</p>
            <span class="text-sm text-light">
              R$ {{ item.price.toFixed(2).replace(".", ",") }}
            </span>
            <button
              @click="cart.removeItem(item.id)"
              class="text-white bg-red-600 hover:bg-red-700 text-xs px-2 py-1 rounded transition"
            >
              Remover
            </button>
          </li>
        </ul>

        <div
          class="flex justify-between font-semibold text-3xl text-light mb-4"
        >
          <span>Total:</span>
          <span>R$ {{ cart.total.toFixed(2).replace(".", ",") }}</span>
        </div>

        <button
          @click="submit"
          class="w-full py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600 font-semibold"
        >
          Finalizar
        </button>
      </div>
    </div>

    <SuccessModal :visible="showSuccess" @close="$router.push('/')" />
  </UiContainer>
</template>

<script setup lang="ts">
const cart = useCartStore()
const showSuccess = ref(false)
const submitted = ref(false)

const name = ref("")
const cpf = ref("")
const phone = ref("")
const email = ref("")
const cep = ref("")
const street = ref("")
const city = ref("")
const state = ref("")
const cepStatus = ref<"idle" | "success" | "error">("idle")

const requiredFields = ["name", "cpf", "phone", "email", "cep"] as const
const errors = reactive<Record<(typeof requiredFields)[number], boolean>>({
  name: false,
  cpf: false,
  phone: false,
  email: false,
  cep: false,
})

const isValidEmail = (email: string) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

const submit = () => {
  submitted.value = true

  errors.name = name.value.trim() === ""
  errors.cpf = cpf.value.trim() === ""
  errors.phone = phone.value.trim() === ""
  errors.email = !email.value.trim() || !isValidEmail(email.value)
  errors.cep = cep.value.trim() === ""

  const hasErrors = Object.values(errors).some((error) => error)
  console.log(hasErrors)

  if (hasErrors) return

  showSuccess.value = true
  cart.items = []
}

const fechtAddress = async () => {
  const cleanCep = cep.value.replace(/\D/g, "")

  if (cleanCep.length !== 8) {
    cepStatus.value = "error"
    return
  }

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`)
    const data = await response.json()

    if (data.erro) return

    street.value = data.logradouro
    city.value = data.localidade
    state.value = data.uf
    cepStatus.value = "success"
  } catch (err) {
    console.error("Erro ao buscar CEP:", err)
    cepStatus.value = "error"
  }
}

useSeoMeta({
  title: "Finalizar Compra | DOTFlix",
  description: "Revise seu pedido e finalize sua compra na DOTFlix.",
  ogTitle: "Finalizar Compra | DOTFlix",
  ogDescription: "Revise seu pedido e finalize sua compra na DOTFlix.",
  ogImage: "/og-image.png",
  ogUrl: "https://dotflix.vercel.app//checkout",
  twitterTitle: "Finalizar Compra | DOTFlix",
  twitterDescription: "Revise seu pedido e finalize sua compra na DOTFlix.",
  twitterImage: "/og-image.png",
  twitterCard: "summary_large_image",
})
</script>

<style scoped>
.input {
  @apply w-full px-4 py-2 rounded border border-gray-700 bg-gray-800 text-light placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition;
}

.input-error {
  @apply border-red-500 focus:ring-red-500;
}

.input:disabled {
  @apply bg-gray-700 text-gray-400 cursor-not-allowed;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
