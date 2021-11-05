
### ![ProdStorybook](https://github.com/storybookjs/brand/raw/master/icon/icon-storybook-default.svg) Storybook

Utilizaremos o Storybook para um guideline do produto, no que diz respeito a frontend e design.

Links para o Storybook:

- [![ProdStorybook](https://github.com/storybookjs/brand/raw/master/icon/icon-storybook-default.svg) Production](https://vuepb.com)
<!-- - [![ProdStorybook](https://github.com/storybookjs/brand/raw/master/icon/icon-storybook-monochrome.svg) Staging](https://storybook.homologacao.online) -->

Para rodar localmente:

```shell
npm run storybook
```

:warning: Escrevemos as documentações dos componentes no Storybook **em Inglês** pois facilitará a migração para um repositório público.

#### Nomeando histórias

A nomenclatura das histórias seguirá um caminho lógico para o produto:

O primeiro nível de indentação como um título para o "capítulo", por exemplo:

- Introduction (explicando como utilizar o Polar Bear Components, boas práticas, etc).
- Accessibility (falando um pouco sobre a padronização de acessibilidade dentro do Polar Bear)
- Components
- Design
- Principles

O segundo nível de indentação como agrupador.

E o terceiro como nome do componente.

Ou seja o pathing das histórias (definido na tag Meta, descrita a seguir) seguirá a lógica abaixo:

```txt
<area>/<tipo (agrupador)>/<história>
```

Como por exemplo:

```txt
Components/Navigation/pb-breadcrumb
```

#### Estrutura de pastas

```txt
src
|--components
|---{ComponentsType}
|----{Component}
|-----{Component}.stories.js|mdx
|-----{Component}.vue
```

`.stories.js|mdx`

São os arquivos que o Storybook usa para documentar as histórias dos componentes, neles deverão estar toda a parte documental e os casos de uso do componente em questão, bem como a estruturação do seu playground (knobs).

<sup>
Obs: preferencialmente escreveremos apenas o `.mdx` por facilitar a criação de documentações interativas.
</sup>

#### Como escrever docs (stories) (MDX)

As docs em [`.mdx`](https://storybook.js.org/docs/formats/mdx-syntax/) são uma mistura de Markdown com JSX. Com isso podemos escrever uma documentação escrita e que possa ser formatada pelo padrão Markdown.

Visite a área de [Problemas conhecidos](#problemas-conhecidos) para saber as limitações do MDX.

O [`addon-docs`](https://github.com/storybookjs/storybook/tree/next/addons/docs) disponibiliza quatro elementos principais (existem outros) que podemos usar nas nossas documentações.

São eles:

- `<Meta>`
- `<Canvas>` (funcionalidade de "View code")
- `<Story>` (a própria story)
- `<ArgsTable>` (cria a PropsTable automaticamente)

Um exemplo de documentação:

```mdx
<Meta title="Components/Buttons/Button" component={Button} />

# Button

Componente de **botão** e suas variações.

### All sizes
<Canvas>
  <Story name="Button" height="460px">{{
    components: { Button },
    template: `
      <div>
        <Button>Clique aqui</Button>
      </div>
    `
  }}</Story>
</Canvas>

<ArgsTable of={Button} />
```

#### Addons utilizados

- **[@storybook/addon-docs](https://www.npmjs.com/package/@storybook/addon-docs)**
- **[@storybook/addon-knobs](https://www.npmjs.com/package/@storybook/addon-knobs)**
- **[@storybook/addon-a11y](https://www.npmjs.com/package/@storybook/addon-a11y)**
- **[@storybook/addon-actions](https://www.npmjs.com/package/@storybook/addon-actions)**
- [@storybook/addon-backgrounds](https://www.npmjs.com/package/@storybook/addon-backgrounds)
- [@storybook/addon-links](https://www.npmjs.com/package/@storybook/addon-links)
- [@storybook/addon-viewport](https://www.npmjs.com/package/@storybook/addon-viewport)
- [storybook-dark-mode](https://www.npmjs.com/package/storybook-dark-mode)

#### Problemas conhecidos

- Identação de `import`s e tag `<Meta>` devem sempre possuir uma linha em branco, caso contrário quebrará o build e dará um erro com `h is not defined`;
- Conteúdos dentro do `template` em `<Story>` não podem possuir linhas em branco, devem ser identados sem quebra de linhas, caso contrário quebrará o build e dará um erro com `Unexpected token, expected ","`
