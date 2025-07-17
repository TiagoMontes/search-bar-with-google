# Configuração da API do Google Places

## Setup da API

1. **Obtenha uma chave da API do Google Places:**

   - Acesse: https://console.cloud.google.com/
   - Crie um novo projeto ou selecione um existente
   - Vá para "APIs & Services" > "Credentials"
   - Clique em "Create Credentials" > "API Key"
   - Copie a chave gerada

2. **Habilite a API do Places:**

   - Vá para "APIs & Services" > "Library"
   - Procure por "Places API"
   - Clique em "Enable"

3. **Configure as variáveis de ambiente:**
   - Crie um arquivo `.env.local` na raiz do projeto
   - Adicione sua chave da API:
   ```
   NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=sua_chave_aqui
   ```

## Funcionalidades Implementadas

### Autocomplete de Destinos

- Busca automática de cidades e estados
- Debounce de 300ms para evitar muitas requisições
- Cache local para melhor performance
- Navegação com teclado (setas, enter, escape)
- Filtro para apenas cidades e estados

### Componentes Disponíveis

1. **GooglePlacesService** - Serviço principal para comunicação com a API
2. **useAutocomplete** - Hook personalizado para gerenciar autocomplete
3. **AutocompleteInput** - Componente de input com autocomplete

### Exemplo de Uso

```tsx
import { AutocompleteInput } from "../components/AutocompleteInput";

function MyComponent() {
  const [location, setLocation] = useState("");

  return (
    <AutocompleteInput
      value={location}
      onChange={setLocation}
      onSelect={(prediction) => {
        console.log("Local selecionado:", prediction);
      }}
      placeholder="Para onde?"
    />
  );
}
```

## Limitações da API

- **Quota gratuita:** 1000 requisições por dia
- **Rate limiting:** Máximo 10 requisições por segundo
- **Tipos suportados:** Cidades, estados e regiões administrativas

## Troubleshooting

### Erro: "Google Places API Key não configurada"

- Verifique se o arquivo `.env.local` existe
- Confirme se a variável `NEXT_PUBLIC_GOOGLE_PLACES_API_KEY` está definida
- Reinicie o servidor de desenvolvimento

### Erro: "REQUEST_DENIED"

- Verifique se a API do Places está habilitada no Google Cloud Console
- Confirme se a chave da API está correta
- Verifique se há restrições de domínio na chave da API

### Erro: "OVER_QUERY_LIMIT"

- Você atingiu o limite de requisições
- Aguarde ou considere fazer upgrade do plano

## Segurança

- A chave da API é pública (NEXT*PUBLIC*) pois é usada no frontend
- Configure restrições de domínio na Google Cloud Console
- Monitore o uso da API para evitar custos inesperados
