#### Agregado (Aggregate)

-    Encapsulam e são compostos por classes de entidade e objetos de valor que mudam juntos em uma transação de negócio
-    A Agregado Raiz deve ser uma entidade, um agregado pode até ser uma única entidade
-    O agregado pode manter uma referência a outros agregados raizes, mas não a outras classes de entidade que não são as próprias raízes agregadas
-    O agregado não deve manter uma referência a outras classes de entidade raiz agregada se essas outras entidades não mudarem junto com esta entidade raiz agregada
-    O agregado também pode manter o id de outra entidade, mas manter muitos ids de chave estrangeira é um cheiro de erro de modelagem de domínio.
-    Se a exclusão de uma entidade tiver um efeito em cascata sobre as outras entidades referenciadas por classe, essas entidades fazem parte do mesmo agregado, caso contrário, não deveriam estar dentro deste agregado.
