<!-- $lib/math/Micromechanics.svelte -->
<script lang="ts">
  import { createTable, Render, Subscribe, createRender } from "svelte-headless-table";
  import { addSortBy, addTableFilter } from "svelte-headless-table/plugins";
  import { readable } from "svelte/store";
  import ArrowUpDown from "lucide-svelte/icons/arrow-up-down";
  import * as Table from "$lib/components/ui/table";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import * as Select from "$lib/components/ui/select";

  type Property = {
    name: string;
    value: number;
    unit: string;
    theory: string;
  };

  const data: Property[] = [
    { name: "E1", value: 100, unit: "GPa", theory: "ROM" },
    { name: "E2", value: 50, unit: "GPa", theory: "Chamis" },
    { name: "G12", value: 25, unit: "GPa", theory: "Hashin-Rosen" },
    { name: "nu12", value: 0.25, unit: "-", theory: "ROM" },
  ];

  const theories = {
    E1: ['ROM', 'Inverse ROM', 'Halpin-Tsai'],
    E2: ['ROM', 'Chamis', 'Halpin-Tsai'],
    G12: ['ROM', 'Chamis', 'Hashin-Rosen'],
    nu12: ['ROM', 'Chamis', 'Halpin-Tsai']
  };

  const table = createTable(readable(data), {
    sort: addSortBy({ disableMultiSort: true }),
    filter: addTableFilter({
      fn: ({ filterValue, value }) => value.toLowerCase().includes(filterValue.toLowerCase()),
    }),
  });

  const columns = table.createColumns([
    table.column({
      accessor: "name",
      header: "Property",
    }),
    table.column({
      accessor: "value",
      header: "Value",
    }),
    table.column({
      accessor: "unit",
      header: "Unit",
    }),
    table.column({
      accessor: "theory",
      header: "Theory",
      cell: ({ value, row }) => {
        return createRender(Select.Root, {
          value: value,
          onSelectedChange: (newTheory) => {
            // Here you would update the theory for this property
            console.log(`Updating theory for ${row.name} to ${newTheory}`);
          }
        }, [
          createRender(Select.Trigger, {}, [
            createRender(Select.Value, { placeholder: "Select theory" })
          ]),
          createRender(Select.Content, {}, 
            theories[row.name].map(theory => 
              createRender(Select.Item, { value: theory }, [theory])
            )
          )
        ]);
      }
    }),
  ]);

  const { headerRows, rows, tableAttrs, tableBodyAttrs, pluginStates } = table.createViewModel(columns);

  const { filterValue } = pluginStates.filter;
</script>

<div>
  <div class="flex items-center py-4">
    <Input
      class="max-w-sm"
      placeholder="Filter properties..."
      type="text"
      bind:value={$filterValue}
    />
  </div>
  <div class="rounded-md border">
    <Table.Root {...$tableAttrs}>
      <Table.Header>
        {#each $headerRows as headerRow}
          <Subscribe rowAttrs={headerRow.attrs()}>
            <Table.Row>
              {#each headerRow.cells as cell (cell.id)}
                <Subscribe attrs={cell.attrs()} let:attrs props={cell.props()} let:props>
                  <Table.Head {...attrs}>
                    {#if cell.id !== "theory"}
                      <Button variant="ghost" on:click={props.sort.toggle}>
                        <Render of={cell.render()} />
                        <ArrowUpDown class="ml-2 h-4 w-4" />
                      </Button>
                    {:else}
                      <Render of={cell.render()} />
                    {/if}
                  </Table.Head>
                </Subscribe>
              {/each}
            </Table.Row>
          </Subscribe>
        {/each}
      </Table.Header>
      <Table.Body {...$tableBodyAttrs}>
        {#each $rows as row (row.id)}
          <Subscribe rowAttrs={row.attrs()} let:rowAttrs>
            <Table.Row {...rowAttrs}>
              {#each row.cells as cell (cell.id)}
                <Subscribe attrs={cell.attrs()} let:attrs>
                  <Table.Cell {...attrs}>
                    <Render of={cell.render()} />
                  </Table.Cell>
                </Subscribe>
              {/each}
            </Table.Row>
          </Subscribe>
        {/each}
      </Table.Body>
    </Table.Root>
  </div>
</div>

<div class="mt-4">
  <Button class="w-full">Recalculate Properties</Button>
</div>

<div class="mt-4 h-60 bg-gray-200 flex items-center justify-center">
  <p class="text-gray-500">Properties Visualization Placeholder</p>
</div>