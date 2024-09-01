<!-- $lib/components/Nav.svelte -->
 
<script lang="ts">
  import { Sun, Moon, Menu } from "lucide-svelte";
  import { toggleMode } from "mode-watcher";
  import { Button } from "$lib/components/ui/button";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
</script>

<nav class="absolute right-4 top-4 flex items-center space-x-2">
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
</nav>