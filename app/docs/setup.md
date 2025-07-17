# Setup das Variáveis de Ambiente

## 1. Crie o arquivo .env.local

Na raiz do projeto, crie um arquivo chamado `.env.local` com o seguinte conteúdo:

```env
# Google Places API Configuration
NEXT_PUBLIC_GOOGLE_PLACES_API_KEY=sua_chave_aqui

# Outras configurações opcionais
NEXT_PUBLIC_APP_NAME=SearchFinder
NEXT_PUBLIC_APP_VERSION=1.0.0
```

## 2. Obtenha sua chave da API do Google Places

1. Acesse: https://console.cloud.google.com/
2. Crie um novo projeto ou selecione um existente
3. Vá para "APIs & Services" > "Credentials"
4. Clique em "Create Credentials" > "API Key"
5. Copie a chave gerada
6. Substitua `sua_chave_aqui` pela chave real

## 3. Habilite a API do Places

1. Vá para "APIs & Services" > "Library"
2. Procure por "Places API"
3. Clique em "Enable"

## 4. Configure restrições (opcional mas recomendado)

1. Na página de credenciais, clique na chave criada
2. Em "Application restrictions", selecione "HTTP referrers"
3. Adicione seus domínios (ex: localhost:3000, seu-dominio.com)
4. Em "API restrictions", selecione "Restrict key"
5. Selecione apenas "Places API"

## 5. Teste a aplicação

1. Reinicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

2. Acesse http://localhost:3000

3. Teste o autocomplete digitando "Rio B" no campo de destino

## Exemplo de funcionamento

- Digite "Rio B" → Verá "Rio Branco, AC, Brasil"
- Digite "São P" → Verá "São Paulo, SP, Brasil"
- Digite "Flori" → Verá "Florianópolis, SC, Brasil"

## Troubleshooting

### Erro: "Google Places API Key não configurada"

- Verifique se o arquivo `.env.local` existe na raiz do projeto
- Confirme se a variável está escrita corretamente
- Reinicie o servidor após criar/modificar o arquivo

### Erro: "REQUEST_DENIED"

- Verifique se a API do Places está habilitada
- Confirme se a chave está correta
- Verifique as restrições de domínio

### Erro: "OVER_QUERY_LIMIT"

- Você atingiu o limite de 1000 requisições/dia
- Aguarde ou faça upgrade do plano
