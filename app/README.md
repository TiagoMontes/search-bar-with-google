# SearchFinder - Estrutura do Projeto

## 📁 Organização das Pastas

```
app/
├── components/          # Componentes React reutilizáveis
│   ├── AutocompleteInput.tsx
│   └── index.ts
├── hooks/              # Hooks personalizados
│   ├── useAutocomplete.ts
│   └── index.ts
├── services/           # Serviços e APIs
│   ├── googlePlaces.ts
│   ├── config.ts
│   └── index.ts
├── docs/              # Documentação
│   ├── README.md
│   └── setup.md
├── page.tsx           # Página principal
├── layout.tsx         # Layout da aplicação
└── globals.css        # Estilos globais
```

## 🎯 Funcionalidades

### Autocomplete de Destinos

- Integração com Google Places API
- Busca automática de cidades e estados
- Debounce e cache para otimização
- Navegação por teclado

### Componentes Disponíveis

#### `AutocompleteInput`

Componente de input com autocomplete para destinos.

```tsx
import { AutocompleteInput } from "./components";

<AutocompleteInput
  value={location}
  onChange={setLocation}
  onSelect={(prediction) => console.log(prediction)}
  placeholder="Digite o destino"
/>;
```

### Hooks Disponíveis

#### `useAutocomplete`

Hook para gerenciar autocomplete de destinos.

```tsx
import { useAutocomplete } from "./hooks";

const { predictions, loading, searchPredictions } = useAutocomplete({
  delay: 300,
  minLength: 2,
});
```

### Serviços Disponíveis

#### `googlePlacesService`

Serviço para comunicação com a API do Google Places.

```tsx
import { googlePlacesService } from "./services";

const predictions = await googlePlacesService.getPlacePredictions("Rio B");
```

## 🚀 Como Usar

1. **Configure as variáveis de ambiente:**

   ```env
   NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=sua_chave_aqui
   ```

2. **Importe os componentes:**

   ```tsx
   import { AutocompleteInput } from "./components";
   import { PlacePrediction } from "./services";
   ```

3. **Use o autocomplete:**

   ```tsx
   const [location, setLocation] = useState("");

   <AutocompleteInput
     value={location}
     onChange={setLocation}
     onSelect={(prediction) => {
       console.log("Local selecionado:", prediction.description);
     }}
   />;
   ```

## 📚 Documentação

- [Configuração da API](./docs/README.md)
- [Setup das Variáveis de Ambiente](./docs/setup.md)

## 🔧 Desenvolvimento

### Estrutura de Importações

- Use os arquivos `index.ts` para importações limpas
- Componentes: `import { Component } from './components'`
- Hooks: `import { useHook } from './hooks'`
- Serviços: `import { service } from './services'`

### Adicionando Novos Componentes

1. Crie o componente em `components/`
2. Exporte no `components/index.ts`
3. Use `import { Component } from './components'`

### Adicionando Novos Hooks

1. Crie o hook em `hooks/`
2. Exporte no `hooks/index.ts`
3. Use `import { useHook } from './hooks'`

### Adicionando Novos Serviços

1. Crie o serviço em `services/`
2. Exporte no `services/index.ts`
3. Use `import { service } from './services'`
