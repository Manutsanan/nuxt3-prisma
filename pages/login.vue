<template>
  <form
    class="flex flex-col gap-3 border shadow p-5 rounded-lg"
    :class="['w-auto min-w-[240px]']"
    @submit="onSubmit"
  >
    <span class="text-lg">Nuxt3 + Prisma</span>
    <div class="grid grid-cols-1 gap-2">
      <div class="form-input">
        <div class="absolute flex justify-center items-center h-full pl-3">
          <Icon name="ph:user-fill" class="text-gray-500" />
        </div>
        <input
          type="text"
          class="pl-8 py-1.5 rounded-lg border-2 border-gray-100 text-gray-500"
          :class="['hover:border-blue-500', 'focus:border-blue-500']"
          v-model="username"
          placeholder="ชื่อผู้ใช้"
        />
      </div>
      <div class="form-input">
        <div class="absolute flex justify-center items-center h-full pl-3">
          <Icon name="teenyicons:password-solid" class="text-gray-500" />
        </div>
        <div
          class="absolute right-0 flex justify-center items-center h-full pr-3"
          @click="showPassword = !showPassword"
        >
          <Icon
            :name="
              (!showPassword && 'heroicons-solid:eye') ||
              'flowbite:eye-slash-solid'
            "
            class="text-gray-500"
          />
        </div>
        <input
          :type="(!showPassword && 'password') || 'text'"
          class="px-8 py-1.5 rounded-lg border-2 border-gray-100 text-gray-500"
          :class="['hover:border-blue-500', 'focus:border-blue-500']"
          v-model="password"
          placeholder="รหัสผ่าน"
        />
      </div>
    </div>
    <div class="flex justify-center">
      <button type="submit" class="btn primary w-full py-1 rounded gap-1">
        <Icon v-if="loading" name="uiw:loading" class="animate-spin" />
        {{ (loading && "กำลังเข้าสู่ระบบ") || "เข้าสู่ระบบ" }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
definePageMeta({
  name: "PageLogin",
  layout: "custom",
  middleware: process.client ? "login" : undefined,
});

const { $swal }: any = useNuxtApp();
const router = useRouter();

const loading = ref<boolean>(false);
const showPassword = ref<boolean>(false);
const username = ref<string>("");
const password = ref<string>("");

const onSubmit = async (event: Event) => {
  event.preventDefault();

  if (!username.value || !password.value) {
    return $swal.fire({
      icon: "warning",
      title: "แจ้งเตือน !",
      text: "ผู้ใช้งาน หรือรหัสผ่าน ไม่ถูกต้อง",
    });
  }

  try {
    loading.value = true;

    const refToken = setCookie("token");
    refToken.value = password.value || "";
    const refUsername = setCookie("username");
    refUsername.value = username.value || "";
    router.push("/");

    // const response: any = await service.auth.login({
    //   username: form.username,
    //   password: form.password,
    // });
    // if (response?.status?.code == "200") {
    //   const refToken = setCookie("token");
    //   refToken.value = response?.data || "";
    //   const refUsername = setCookie("username");
    //   refUsername.value = form.username || "";
    //   router.push("/");
    // } else {
    //   throw new Error(response?.status?.message);
    // }
  } catch (error: any) {
    $swal.fire({
      icon: "warning",
      title: "แจ้งเตือน !",
      text: error.message,
    });
  } finally {
    loading.value = false;
  }
};
</script>
