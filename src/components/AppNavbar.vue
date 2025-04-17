<script setup lang="ts"></script>

<template>
    <div class="mx-16 my-8">
        <nav class="shadow-base-300/20 shadow-sm rounded-box navbar">
            <div class="md:flex md:items-center md:gap-2 w-full">
                <div class="flex justify-between items-center">
                    <div class="justify-between items-center max-md:w-full navbar-start">
                        <a class="font-bold text-base-content text-xl no-underline link link-neutral" href="/"
                            >Revision&nbsp;Assistant</a
                        >
                        <div class="md:hidden">
                            <button
                                type="button"
                                class="collapse-toggle btn-outline btn btn-secondary btn-sm btn-square"
                                data-collapse="#default-navbar-collapse"
                                aria-controls="default-navbar-collapse"
                                aria-label="Toggle navigation"
                            >
                                <span class="collapse-open:hidden size-4 icon-[tabler--menu-2]"></span>
                                <span class="hidden collapse-open:block size-4 icon-[tabler--x]"></span>
                            </button>
                        </div>
                    </div>
                </div>
                <div
                    id="default-navbar-collapse"
                    class="hidden collapse max-md:w-full overflow-hidden transition-[height] duration-300 md:navbar-end grow basis-full"
                >
                    <ul class="gap-2 max-md:mt-2 p-0 text-base menu md:menu-horizontal"></ul>
                </div>
            </div>
        </nav>
    </div>
</template>
