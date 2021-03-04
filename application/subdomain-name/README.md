#### Casos de Uso (Serviço de Aplicação)

-    Casos de Uso ou Serviço de Aplicação são classes que executam comandos para a realização de uma operação na camada de aplicação.
-    Não contêm lógica de negócios específica de domínio.
-    São usados para buscar entidades de domínio (e qualquer outra coisa) da persistência e do mundo externo.
-    Passa o controle para um agregado para executar a lógica do domínio usando um método do agregado.
-    Passa várias entidades para um serviço de domínio para facilitar sua interação.
-    Têm baixos níveis de Complexidade Ciclomática.
