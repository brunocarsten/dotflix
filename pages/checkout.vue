<template>
  <UiContainer class="py-8">
    <h1 class="text-2xl font-bold mb-6">Finalizar Compra</h1>

    <div class="grid md:grid-cols-2 gap-8">
      <!-- Formulário -->
      <form @submit.prevent="submit" class="space-y-4">
        <input
          v-model="form.name"
          type="text"
          placeholder="Nome Completo"
          :class="{ input: true, 'border-red-500': isInvalid('name') }"
        />

        <div class="flex gap-4">
          <input
            v-model="form.cpf"
            v-mask="'###.###.###-##'"
            placeholder="CPF"
            :class="{ input: true, 'border-red-500': isInvalid('cpf') }"
          />
          <input
            v-model="form.phone"
            v-mask="'(##) #####-####'"
            placeholder="Celular"
            :class="{ input: true, 'border-red-500': isInvalid('phone') }"
          />
        </div>

        <input
          v-model="form.email"
          type="email"
          placeholder="E-mail"
          :class="{ input: true, 'border-red-500': isInvalid('email') }"
        />

        <div class="flex gap-4">
          <input
            v-model="form.cep"
            v-mask="'#####-###'"
            placeholder="CEP"
            :class="{ input: true, 'border-red-500': isInvalid('cep') }"
          />
          <input
            v-model="form.street"
            type="text"
            placeholder="Endereço"
            class="input"
          />
        </div>

        <div class="flex gap-4">
          <input
            v-model="form.city"
            type="text"
            placeholder="Cidade"
            class="input"
          />
          <input
            v-model="form.state"
            type="text"
            placeholder="Estado"
            class="input"
          />
        </div>
      </form>

      <!-- Carrinho -->
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
          </li>
        </ul>

        <div class="flex justify-between font-semibold text-lg text-light mb-4">
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

const form = ref({
  name: "",
  cpf: "",
  phone: "",
  email: "",
  cep: "",
  street: "",
  city: "",
  state: "",
})

function isInvalid(field: keyof typeof form.value) {
  return submitted.value && !form.value[field]?.trim()
}

function submit() {
  if (!cart.items.length) {
    alert("Seu carrinho está vazio.")
    return
  }
  submitted.value = true

  const requiredFields: (keyof typeof form.value)[] = [
    "name",
    "cpf",
    "phone",
    "email",
    "cep",
  ]
  const isValid = requiredFields.every(
    (field) => form.value[field]?.trim() !== ""
  )

  if (!isValid) return

  showSuccess.value = true
  cart.items = []
}
</script>

<style scoped>
.input {
  @apply w-full px-4 py-2 rounded border border-gray-700 bg-gray-800 text-light placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition;
}
</style>
