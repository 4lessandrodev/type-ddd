#### Evento de Domínio (Domain Event)

-    Pode ser gerado quando ocorre uma mudança de estado em uma entidade.
-    Desacopla models uma das outras
-    Usado apenas quando um evento precisa ser tratado dentro de uma model diferente daquela que gerou este evento, ou tratado dentro de um serviço de domínio ou mesmo um serviço de aplicativo.
-    São classes imutáveis, que representam o passado, nomeadas no pretérito e não podem mudar (... Alterado, ... Acontecido, etc.)
-    Deve incluir a hora em que este evento foi gerado, bem como qualquer outra informação útil para lidar com o evento, bem como o id da entidade que gerou o evento.
-    Não deve ter comportamento.
-    Os eventos de domínio são gerados de forma síncrona, se uma tarefa assíncrona precisa ser realizada, isso pode ser feito dentro do manipulador de eventos (padrão async-await).
-    Aplicativos externos também podem ser acionados usando uma fila de mensagens ou um barramento de serviço.
