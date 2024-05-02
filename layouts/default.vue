<template>
  <div class="flex grow flex-col h-screen w-full">
    <aside
      class="fixed bottom-0 top-0 z-30 md:z-20 flex flex-col border-zinc-300/25 bg-white py-6 ltr:border-r rtl:border-l transition-all duration-300 ease-in-out max-md:shadow-2xl ltr:max-md:-left-[20rem] rtl:max-md:-right-[20rem] overflow-hidden"
      :class="
        (isShow && 'w-[20rem] sm:w-[20rem] md:w-[20rem]') ||
        'w-0 sm:w-0 md:w-[6.225em]'
      "
    >
      <div class="flex flex-col">
        <div
          class="flex align-middle items-center px-6 pb-6"
          :class="(isShow && 'justify-between') || 'justify-center'"
        >
          <a :class="(isShow && 'block') || 'hidden'" href="/">
            <Icon name="skill-icons:webflow" class="text-4xl" />
          </a>

          <button
            type="button"
            class="flex h-12 w-12 items-center justify-center"
            @click="isShow = !isShow"
          >
            <Icon
              :name="
                (isShow && 'ant-design:bars-outlined') || 'gravity-ui:bars'
              "
              class="text-2xl"
            />
          </button>
        </div>

        <nav class="h-full px-6 no-scrollbar">
          <ul>
            <li
              v-for="(menu, menuIndex) in menus"
              :key="menuIndex"
              class="cursor-pointer flex list-none items-center overflow-hidden whitespace-nowrap pb-1"
            >
              <template v-if="!menu?.childs">
                <nuxt-link
                  :to="menu.to"
                  class="menu-bar"
                  @click="isMobile && hiddenMenu()"
                >
                  <Icon :name="menu.icon" class="w-6 flex-none me-2 ms-1" />
                  <div
                    class="flex w-full items-center justify-between truncate"
                  >
                    <div class="overflow-hidden truncate whitespace-nowrap">
                      {{ menu.name }}
                    </div>
                  </div>
                </nuxt-link>
              </template>
              <template v-else>
                <div class="flex flex-col w-full">
                  <div
                    class="menu-bar grow"
                    :class="(menu.show && 'menu-active') || ''"
                    @click="menu.show = !menu.show"
                  >
                    <Icon :name="menu.icon" class="w-6 flex-none me-2 ms-1" />
                    <div
                      class="flex w-full items-center justify-between truncate"
                    >
                      <div class="overflow-hidden truncate whitespace-nowrap">
                        {{ menu.name }}
                      </div>

                      <Icon
                        name="mingcute:down-fill"
                        class="transition ease-in-out delay-200"
                        :class="(menu.show && 'rotate-0') || 'rotate-90'"
                      />
                    </div>
                  </div>
                  <ul
                    class="transition ease-in-out delay-200 overflow-hidden"
                    :class="[
                      (isShow && 'ml-5') || 'ml-0',
                      (menu.show && 'h-auto') || 'h-0',
                    ]"
                  >
                    <li
                      v-for="(child, childIndex) in menu.childs"
                      :key="childIndex"
                      class="cursor-pointer flex list-none items-center overflow-hidden whitespace-nowrap pb-1"
                    >
                      <nuxt-link
                        :to="child.to"
                        class="menu-bar"
                        @click="isMobile && hiddenMenu()"
                      >
                        <Icon
                          :name="child.icon"
                          class="w-6 flex-none me-2 ms-1"
                        />
                        <div
                          class="flex w-full items-center justify-between truncate"
                        >
                          <div
                            class="overflow-hidden truncate whitespace-nowrap"
                          >
                            {{ child.name }}
                          </div>
                        </div>
                      </nuxt-link>
                    </li>
                  </ul>
                </div>
              </template>
            </li>
          </ul>
        </nav>
      </div>
    </aside>

    <section
      class="flex flex-col justify-between transition-all duration-300 ease-in-out h-screen w-full sm:pl-0 scrollbar-auto bg-zinc-100"
      :class="(isShow && 'md:pl-[20rem]') || 'md:pl-[6.225em]'"
    >
      <!-- Header -->
      <header
        class="sticky top-0 z-10 flex flex-wrap justify-between gap-4 border-b border-zinc-300/25 bg-white/75 p-3 sm:p-3 md:p-6 backdrop-blur-md"
      >
        <div
          class="flex flex-wrap items-center gap-4 ltr:md:mr-auto rtl:md:ml-auto"
        >
          <button
            type="button"
            class="flex sm:flex md:hidden h-12 w-12 items-center justify-center"
            @click="isShow = !isShow"
          >
            <Icon name="fa:bars" class="text-xl" />
          </button>

          <Breadcrumb />
        </div>

        <div
          class="flex flex-wrap items-center gap-2 ltr:md:ml-auto rtl:md:mr-auto"
        >
          <button type="button" class="btn-default-info" @click="onLogout()">
            <Icon name="material-symbols:logout" class="text-xl" />
          </button>
        </div>
      </header>

      <!-- Main Content -->
      <div class="grow p-5">
        <slot></slot>
      </div>

      <!-- Footer -->
      <footer class="flex justify-between gap-4 p-6 text-sm">
        <div
          class="flex items-center gap-4 ltr:md:mr-auto rtl:md:ml-auto text-zinc-500"
        >
          <div>Copyright © 2025</div>
        </div>
        <div
          class="flex items-center gap-4 ltr:md:ml-auto rtl:md:mr-auto text-zinc-500"
        >
          <span><b>Nuxt3 + Prisma</b> Manage</span>
        </div>
      </footer>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { MenuList } from "~/models/menu.model";

defineComponent({
  setup() {
    definePageMeta({
      name: "LayoutDefault",
    });
  },
});

const route = useRoute();
const router = useRouter();

const isShow = ref<boolean>(true);
const screenWidth = ref<number>(0);
const screenWidthMobile = ref<number>(1280);
const menus = ref<MenuList[]>([
  { name: "หน้าหลัก", icon: "ic:round-home", to: "/" },
  { name: "แดชบอร์ด", icon: "material-symbols:dashboard", to: "/dashboard" },
  {
    name: "ตั้งค่า",
    icon: "uil:setting",
    show: false,
    childs: [
      {
        name: "ระบบ",
        icon: "tdesign:system-sum",
        to: "/setting/system",
      },
    ],
  },
]);

const isMobile = computed(() => {
  return screenWidth.value <= screenWidthMobile.value;
});

watch(
  () => route.path,
  () => {
    checkMenuActive();
  },
  {
    deep: true,
  }
);

const initDate = () => {
  updateScreenWidth();
  window.addEventListener("resize", updateScreenWidth);
};

const updateScreenWidth = () => {
  screenWidth.value = window.innerWidth;
  isShow.value = isMobile.value ? false : true;
};

const checkMenuActive = () => {
  for (let i = 0; i < menus.value.length; i++) {
    const menu = menus.value[i];

    if (menu?.childs?.length) {
      let showMenu = false;
      for (let ii = 0; ii < menu.childs.length; ii++) {
        const child = menu.childs[ii];
        if (child.to === route.path) {
          showMenu = true;
        }
      }

      menu.show = showMenu;
    }
  }
};

const hiddenMenu = () => {
  isShow.value = false;
};

const onLogout = () => {
  removeCookie("token");
  removeCookie("title_page");
  removeCookie("username");

  router.push("/login");
};

const definePageMeta = (arg0: { name: string }) => {
  throw new Error("Function not implemented.");
};

onMounted(() => {
  if (typeof window !== "undefined") {
    initDate();
  }

  checkMenuActive();
});
</script>

<style lang="scss" scoped>
.menu-bar {
  @apply p-2 flex justify-start align-middle items-center cursor-pointer overflow-hidden rounded-xl border text-zinc-500 hover:text-zinc-950 grow transition-all duration-300 ease-in-out border-transparent;

  &.router-link-exact-active {
    @apply text-zinc-950 border-zinc-300;
  }
  &.menu-active {
    @apply text-zinc-950;
  }
}
</style>
