# Domain Driven Design

## Backend

Arquivos padrões em typescript para iniciar um projeto usando DDD. Inspirado nos princípios de [Domain Driven Design](https://khalilstemmler.com/articles/categories/domain-driven-design/).

### Componentes do bloco de construção utilizados em cada subdomínio

#### Entidade (Entity)

-    Tem um id (de preferência um GUID em vez de um int gerado pelo banco de dados, porque as transações de negócios não dependem da persistência, podem ser persistidas após outras operações realizadas no comportamento da model)
-    A classe de entidade não deve ter setters de propriedade pública, definir uma propriedade deve ser um método de comportamento da classe.
-    As relações de entidade não devem conter uma referência a outra classe de entidade, podem apenas manter o id de outra entidade
-    Se uma transação de negócios precisa de uma referência a outras entidades em relação, agregados devem ser usados ​​em seu lugar (agregados podem conter uma referência a outras raízes agregadas, que são classes de entidade por definição)
-    Deve validar seu estado e impedir qualquer estado inválido.

#### Objeto de Valor (Value Object)

-    São identificados apenas por seus valores, não por seus ids (por exemplo, dinheiro é um objeto de valor, desde que não estejamos rastreando notas individuais, se precisarmos rastrear notas individuais, então deve ser uma entidade de notas)
-    Pode ser usado para medir ou descrever coisas (nome, descrição, quantidade, altura, data, hora, intervalo, endereço, etc.)
-    Você pode combinar outros tipos de valor que geralmente vão juntos em um novo tipo de objeto de valor, como endereço (cidade, rua, país, código postal) ou ... intervalo ou ... tipo
-    Prefira colocar o comportamento em objetos de valor em vez de entidades porque os objetos de valor são imutáveis ​​e não têm efeitos colaterais (como alterar seu estado ou alterar o estado de qualquer entidade)
-    Pode ser parte de uma entidade
-    Devem ser imutáveis, os comportamentos não devem alterar o estado de um objeto de valor, mas podem, em vez disso, criar um novo objeto de valor
-    Pode ser persistente, mas apenas como parte de uma entidade, não individualmente

#### Agregado (Aggregate)

-    Encapsulam e são compostos por classes de entidade e objetos de valor que mudam juntos em uma transação de negócio
-    A Agregado Raiz deve ser uma entidade, um agregado pode até ser uma única entidade
-    O agregado pode manter uma referência a outros agregados raizes, mas não a outras classes de entidade que não são as próprias raízes agregadas
-    O agregado não deve manter uma referência a outras classes de entidade raiz agregada se essas outras entidades não mudarem junto com esta entidade raiz agregada
-    O agregado também pode manter o id de outra entidade, mas manter muitos ids de chave estrangeira é um cheiro de erro de modelagem de domínio.
-    Se a exclusão de uma entidade tiver um efeito em cascata sobre as outras entidades referenciadas por classe, essas entidades fazem parte do mesmo agregado, caso contrário, não deveriam estar dentro deste agregado.

#### Evento de Domínio (Domain Event)

-    Pode ser gerado quando ocorre uma mudança de estado em uma entidade.
-    Desacopla models uma das outras
-    Usado apenas quando um evento precisa ser tratado dentro de uma model diferente daquela que gerou este evento, ou tratado dentro de um serviço de domínio ou mesmo um serviço de aplicativo.
-    São classes imutáveis, que representam o passado, nomeadas no pretérito e não podem mudar (... Alterado, ... Acontecido, etc.)
-    Deve incluir a hora em que este evento foi gerado, bem como qualquer outra informação útil para lidar com o evento, bem como o id da entidade que gerou o evento.
-    Não deve ter comportamento.
-    Os eventos de domínio são gerados de forma síncrona, se uma tarefa assíncrona precisa ser realizada, isso pode ser feito dentro do manipulador de eventos (padrão async-await).
-    Aplicativos externos também podem ser acionados usando uma fila de mensagens ou um barramento de serviço.

#### Serviço de Domínio (Domin Service)

-    Os serviços de domínio não devem manter o estado (os serviços de aplicação não são serviços de domínio, eles estão na camada externa perto da camada de IU e podem manter o estado do aplicativo / tarefa).
-    Os serviços de domínio têm muito pouco comportamento e apenas o que não se encaixa de forma coesa em nenhuma domain model.
-    Os serviços de domínio ficam na camada de domínio central junto com entidades, objetos de valor, agregados e eventos de domínio e expõem modelos de domínio em suas interfaces.

#### Repositório (Repository)

-    Persistir e ler agregados de / para banco de dados ou sistema de arquivos.
-    Deve ter uma interface próxima a uma coleção, mas deve permitir apenas as operações necessárias para este agregado (por exemplo, um agregado pode não precisar ser atualizado ou excluído).
-    Não deve ser genérico (deve ser específico para o tipo de agregado).
-    Pode ter métodos de consulta específicos, se necessário (como FindByName () etc.).
-    Não use o carregamento lento, em vez disso, use o carregamento antecipado (use Include (...) na Model de Infra), caso contrário, você pode enfrentar "N + 1 problema" e número excessivo de consultas enviadas ao banco de dados
-    Pode ter métodos específicos que carregam apenas algumas das colunas de uma tabela
-    A operação de adicionar / atualizar / remover, o repositório deve se comprometer com o banco de dados por si mesmo (chame ... Context.Save () no final), porque as operações agregadas devem ser transações ACID
-    A interface do repositório fica dentro da camada de domínio, mas as implementações estão dentro da camada de infraestrutura.
-    Repositórios não são usados ​​dentro das models de domínio (entidades, objetos de valor, agregados).

#### Casos de Uso (Serviço de Aplicação)

-    Casos de Uso ou Serviço de Aplicação são classes que executam comando para a realização de uma operação na camada de aplicação.
-    Não contêm lógica de negócios específica de domínio.
-    São usados para buscar entidades de domínio (e qualquer outra coisa) da persistência e do mundo externo.
-    Passa o controle para um agregado para executar a lógica do domínio usando um método do agregado.
-    Passa várias entidades para um serviço de domínio para facilitar sua interação.
-    Têm baixos níveis de Complexidade Ciclomática.

#### Mapper

-    Responsável por traduzir a estrutura de um modelo de domínio para uma estrutura de infra e persistência e vice versa.
-    Não possui lógica de negócio.
-    Não realiza validações de estado.

### As Camadas

DDD não é uma arquitetura. O DDD (Domain Driven Design) é uma modelagem de software cujo objetivo é facilitar a implementação de regras e processos complexos, onde visa a divisão de responsabilidades por camadas e é independente da tecnologia utilizada. Ou seja, o DDD é uma filosofia voltado para o domínio do negócio.

![imagem](./readme/arquitetura-hexagonal.jpg 'imagem')

### Padrão de Pastas

![imagem](./readme/padrao-pastas.png 'imagem')
