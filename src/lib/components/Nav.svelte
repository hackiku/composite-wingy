<!-- $lib/components/Nav.svelte -->
 
<script lang="ts">
  import { Sun, Moon, Menu, X, Plane } from "lucide-svelte";
  import { toggleMode } from "mode-watcher";
  import { Button } from "$lib/components/ui/button";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import { fly } from 'svelte/transition';
  import { cubicInOut } from 'svelte/easing';
  import { onMount } from 'svelte';
  import { uiStore } from '$lib/stores/uiStore';

  let showNav = true;
  let lastScrollY = 0;
  let ticking = false;

  $: isSidebarOpen = $uiStore.isSidebarOpen;

  onMount(() => {
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > lastScrollY) {
            showNav = false;
          } else {
            showNav = true;
          }
          lastScrollY = window.scrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  function toggleSidebar() {
    uiStore.update(store => ({ ...store, isSidebarOpen: !store.isSidebarOpen }));
  }
</script>

{#if showNav}
  <nav
    class="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    transition:fly={{ y: -100, duration: 300, easing: cubicInOut }}
  >
    <div class="container flex justify-between items-center h-16 px-4">
      <div class="flex items-center space-x-2">
        <Button variant="ghost" size="icon" on:click={toggleSidebar}>
          {#if isSidebarOpen}
            <X class="h-[1.2rem] w-[1.2rem]" />
          {:else}
            <Plane class="h-[1.2rem] w-[1.2rem]" />
          {/if}
        </Button>
        <span class="font-bold text-xl">Wingy</span>
      </div>
      
      <div class="flex items-center space-x-2">
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild let:builder>
            <Button variant="outline" size="icon" builders={[builder]}>
              <Menu class="h-[1.2rem] w-[1.2rem]" />
              <span class="sr-only">Open menu</span>
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content class="w-56">
            <DropdownMenu.Label>Navigation</DropdownMenu.Label>
            <DropdownMenu.Separator />
            <DropdownMenu.Group>
              <DropdownMenu.Item>
                <a href="/" class="flex w-full">Start</a>
              </DropdownMenu.Item>
              <DropdownMenu.Item>
                <a href="/math" class="flex w-full">Math</a>
              </DropdownMenu.Item>
              <DropdownMenu.Item>
                <a href="/cad" class="flex w-full">CAD</a>
              </DropdownMenu.Item>
            </DropdownMenu.Group>
          </DropdownMenu.Content>
        </DropdownMenu.Root>

        <Button on:click={toggleMode} variant="outline" size="icon">
          <Sun
            class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          />
          <Moon
            class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
          />
          <span class="sr-only">Toggle theme</span>
        </Button>
      </div>
    </div>
  </nav>
{/if}