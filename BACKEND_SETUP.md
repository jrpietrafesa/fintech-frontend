# Guia de Implementação dos Controllers REST no Backend Java

Este documento fornece exemplos de como implementar os controllers REST necessários no backend Java para integração com o frontend Next.js.

## 1. Configuração do Projeto

### Adicionar Dependências (pom.xml ou build.gradle)

```xml
<!-- Spring Boot Web -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
```

### Configurar CORS

```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
```

## 2. Controller de Usuários

```java
package br.com.fiap.controller;

import br.com.fiap.dao.UsuarioDao;
import br.com.fiap.exception.EntidadeNaoEcontradaException;
import br.com.fiap.model.Usuario;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:3000")
public class UsuarioController {
    
    // Login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            UsuarioDao dao = new UsuarioDao();
            Usuario usuario = dao.fazerLogin(request.getEmail(), request.getSenha());
            dao.fecharConexao();
            return ResponseEntity.ok(usuario);
        } catch (EntidadeNaoEcontradaException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(new ErrorResponse("Email ou senha inválidos"));
        } catch (SQLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Erro ao processar login"));
        }
    }
    
    // Listar todos
    @GetMapping
    public ResponseEntity<List<Usuario>> listar() {
        try {
            UsuarioDao dao = new UsuarioDao();
            List<Usuario> usuarios = dao.listar();
            dao.fecharConexao();
            return ResponseEntity.ok(usuarios);
        } catch (SQLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Buscar por ID
    @GetMapping("/{id}")
    public ResponseEntity<?> pesquisar(@PathVariable int id) {
        try {
            UsuarioDao dao = new UsuarioDao();
            Usuario usuario = dao.pesquisar(id);
            dao.fecharConexao();
            return ResponseEntity.ok(usuario);
        } catch (EntidadeNaoEcontradaException e) {
            return ResponseEntity.notFound().build();
        } catch (SQLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Buscar por email
    @GetMapping("/email/{email}")
    public ResponseEntity<?> pesquisarPorEmail(@PathVariable String email) {
        try {
            UsuarioDao dao = new UsuarioDao();
            Usuario usuario = dao.pesquisarPorEmail(email);
            dao.fecharConexao();
            return ResponseEntity.ok(usuario);
        } catch (EntidadeNaoEcontradaException e) {
            return ResponseEntity.notFound().build();
        } catch (SQLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Buscar por CPF
    @GetMapping("/cpf/{cpf}")
    public ResponseEntity<?> pesquisarPorCpf(@PathVariable String cpf) {
        try {
            UsuarioDao dao = new UsuarioDao();
            Usuario usuario = dao.pesquisarPorCpf(cpf);
            dao.fecharConexao();
            return ResponseEntity.ok(usuario);
        } catch (EntidadeNaoEcontradaException e) {
            return ResponseEntity.notFound().build();
        } catch (SQLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Criar
    @PostMapping
    public ResponseEntity<?> cadastrar(@RequestBody Usuario usuario) {
        try {
            UsuarioDao dao = new UsuarioDao();
            dao.cadastrar(usuario);
            dao.fecharConexao();
            return ResponseEntity.status(HttpStatus.CREATED).body(usuario);
        } catch (SQLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Erro ao cadastrar usuário"));
        }
    }
    
    // Atualizar
    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable int id, @RequestBody Usuario usuario) {
        try {
            usuario.setId(id);
            UsuarioDao dao = new UsuarioDao();
            dao.atualizar(usuario);
            dao.fecharConexao();
            return ResponseEntity.ok(usuario);
        } catch (SQLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Erro ao atualizar usuário"));
        }
    }
    
    // Remover
    @DeleteMapping("/{id}")
    public ResponseEntity<?> remover(@PathVariable int id) {
        try {
            UsuarioDao dao = new UsuarioDao();
            dao.remover(id);
            dao.fecharConexao();
            return ResponseEntity.noContent().build();
        } catch (EntidadeNaoEcontradaException e) {
            return ResponseEntity.notFound().build();
        } catch (SQLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}

// Classes auxiliares
class LoginRequest {
    private String email;
    private String senha;
    
    // Getters e Setters
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }
}

class ErrorResponse {
    private String message;
    
    public ErrorResponse(String message) {
        this.message = message;
    }
    
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
}
```

## 3. Controller de Contas

```java
package br.com.fiap.controller;

import br.com.fiap.dao.ContaDao;
import br.com.fiap.exception.EntidadeNaoEcontradaException;
import br.com.fiap.model.Conta;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/api/contas")
@CrossOrigin(origins = "http://localhost:3000")
public class ContaController {
    
    @GetMapping
    public ResponseEntity<List<Conta>> listar() {
        try {
            ContaDao dao = new ContaDao();
            List<Conta> contas = dao.listar();
            dao.fecharConexao();
            return ResponseEntity.ok(contas);
        } catch (SQLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> pesquisar(@PathVariable int id) {
        try {
            ContaDao dao = new ContaDao();
            Conta conta = dao.pesquisar(id);
            dao.fecharConexao();
            return ResponseEntity.ok(conta);
        } catch (EntidadeNaoEcontradaException e) {
            return ResponseEntity.notFound().build();
        } catch (SQLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<Conta>> pesquisarPorUsuario(@PathVariable int usuarioId) {
        try {
            ContaDao dao = new ContaDao();
            List<Conta> contas = dao.pesquisarPorUsuario(usuarioId);
            dao.fecharConexao();
            return ResponseEntity.ok(contas);
        } catch (SQLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @PostMapping
    public ResponseEntity<?> cadastrar(@RequestBody Conta conta) {
        try {
            ContaDao dao = new ContaDao();
            dao.cadastrar(conta);
            dao.fecharConexao();
            return ResponseEntity.status(HttpStatus.CREATED).body(conta);
        } catch (SQLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable int id, @RequestBody Conta conta) {
        try {
            conta.setId(id);
            ContaDao dao = new ContaDao();
            dao.atualizar(conta);
            dao.fecharConexao();
            return ResponseEntity.ok(conta);
        } catch (SQLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> remover(@PathVariable int id) {
        try {
            ContaDao dao = new ContaDao();
            dao.remover(id);
            dao.fecharConexao();
            return ResponseEntity.noContent().build();
        } catch (EntidadeNaoEcontradaException e) {
            return ResponseEntity.notFound().build();
        } catch (SQLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
```

## 4. Controller de Transações

```java
package br.com.fiap.controller;

import br.com.fiap.dao.TransacaoDao;
import br.com.fiap.exception.EntidadeNaoEcontradaException;
import br.com.fiap.model.Transacao;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/api/transacoes")
@CrossOrigin(origins = "http://localhost:3000")
public class TransacaoController {
    
    @GetMapping
    public ResponseEntity<List<Transacao>> listar() {
        try {
            TransacaoDao dao = new TransacaoDao();
            List<Transacao> transacoes = dao.listar();
            dao.fecharConexao();
            return ResponseEntity.ok(transacoes);
        } catch (SQLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> pesquisar(@PathVariable int id) {
        try {
            TransacaoDao dao = new TransacaoDao();
            Transacao transacao = dao.pesquisar(id);
            dao.fecharConexao();
            return ResponseEntity.ok(transacao);
        } catch (EntidadeNaoEcontradaException e) {
            return ResponseEntity.notFound().build();
        } catch (SQLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/conta/{contaId}")
    public ResponseEntity<List<Transacao>> pesquisarPorConta(@PathVariable int contaId) {
        try {
            TransacaoDao dao = new TransacaoDao();
            List<Transacao> transacoes = dao.pesquisarPorConta(contaId);
            dao.fecharConexao();
            return ResponseEntity.ok(transacoes);
        } catch (SQLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/tipo/{tipo}")
    public ResponseEntity<List<Transacao>> pesquisarPorTipo(@PathVariable String tipo) {
        try {
            TransacaoDao dao = new TransacaoDao();
            List<Transacao> transacoes = dao.pesquisarPorTipo(tipo);
            dao.fecharConexao();
            return ResponseEntity.ok(transacoes);
        } catch (SQLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/categoria/{categoria}")
    public ResponseEntity<List<Transacao>> pesquisarPorCategoria(@PathVariable String categoria) {
        try {
            TransacaoDao dao = new TransacaoDao();
            List<Transacao> transacoes = dao.pesquisarPorCategoria(categoria);
            dao.fecharConexao();
            return ResponseEntity.ok(transacoes);
        } catch (SQLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Transacao>> pesquisarPorStatus(@PathVariable String status) {
        try {
            TransacaoDao dao = new TransacaoDao();
            List<Transacao> transacoes = dao.pesquisarPorStatus(status);
            dao.fecharConexao();
            return ResponseEntity.ok(transacoes);
        } catch (SQLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @PostMapping
    public ResponseEntity<?> cadastrar(@RequestBody Transacao transacao) {
        try {
            TransacaoDao dao = new TransacaoDao();
            dao.cadastrar(transacao);
            dao.fecharConexao();
            return ResponseEntity.status(HttpStatus.CREATED).body(transacao);
        } catch (SQLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable int id, @RequestBody Transacao transacao) {
        try {
            transacao.setId(id);
            TransacaoDao dao = new TransacaoDao();
            dao.atualizar(transacao);
            dao.fecharConexao();
            return ResponseEntity.ok(transacao);
        } catch (SQLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> remover(@PathVariable int id) {
        try {
            TransacaoDao dao = new TransacaoDao();
            dao.remover(id);
            dao.fecharConexao();
            return ResponseEntity.noContent().build();
        } catch (EntidadeNaoEcontradaException e) {
            return ResponseEntity.notFound().build();
        } catch (SQLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
```

## 5. Controller de Metas

```java
package br.com.fiap.controller;

import br.com.fiap.dao.MetaDao;
import br.com.fiap.exception.EntidadeNaoEcontradaException;
import br.com.fiap.model.Meta;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/api/metas")
@CrossOrigin(origins = "http://localhost:3000")
public class MetaController {
    
    @GetMapping
    public ResponseEntity<List<Meta>> listar() {
        try {
            MetaDao dao = new MetaDao();
            List<Meta> metas = dao.listar();
            dao.fecharConexao();
            return ResponseEntity.ok(metas);
        } catch (SQLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> pesquisar(@PathVariable int id) {
        try {
            MetaDao dao = new MetaDao();
            Meta meta = dao.pesquisar(id);
            dao.fecharConexao();
            return ResponseEntity.ok(meta);
        } catch (EntidadeNaoEcontradaException e) {
            return ResponseEntity.notFound().build();
        } catch (SQLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<Meta>> pesquisarPorUsuario(@PathVariable int usuarioId) {
        try {
            MetaDao dao = new MetaDao();
            List<Meta> metas = dao.pesquisarPorUsuario(usuarioId);
            dao.fecharConexao();
            return ResponseEntity.ok(metas);
        } catch (SQLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Meta>> pesquisarPorStatus(@PathVariable String status) {
        try {
            MetaDao dao = new MetaDao();
            List<Meta> metas = dao.pesquisarPorStatus(status);
            dao.fecharConexao();
            return ResponseEntity.ok(metas);
        } catch (SQLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @GetMapping("/prioridade/{prioridade}")
    public ResponseEntity<List<Meta>> pesquisarPorPrioridade(@PathVariable String prioridade) {
        try {
            MetaDao dao = new MetaDao();
            List<Meta> metas = dao.pesquisarPorPrioridade(prioridade);
            dao.fecharConexao();
            return ResponseEntity.ok(metas);
        } catch (SQLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @PostMapping
    public ResponseEntity<?> cadastrar(@RequestBody Meta meta) {
        try {
            MetaDao dao = new MetaDao();
            dao.cadastrar(meta);
            dao.fecharConexao();
            return ResponseEntity.status(HttpStatus.CREATED).body(meta);
        } catch (SQLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<?> atualizar(@PathVariable int id, @RequestBody Meta meta) {
        try {
            meta.setId(id);
            MetaDao dao = new MetaDao();
            dao.atualizar(meta);
            dao.fecharConexao();
            return ResponseEntity.ok(meta);
        } catch (SQLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> remover(@PathVariable int id) {
        try {
            MetaDao dao = new MetaDao();
            dao.remover(id);
            dao.fecharConexao();
            return ResponseEntity.noContent().build();
        } catch (EntidadeNaoEcontradaException e) {
            return ResponseEntity.notFound().build();
        } catch (SQLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
```

## 6. Estrutura de Pastas do Backend

```
src/main/java/br/com/fiap/
├── controller/
│   ├── UsuarioController.java
│   ├── ContaController.java
│   ├── TransacaoController.java
│   └── MetaController.java
├── dao/
│   ├── UsuarioDao.java
│   ├── ContaDao.java
│   ├── TransacaoDao.java
│   └── MetaDao.java
├── model/
│   ├── Usuario.java
│   ├── Conta.java
│   ├── Transacao.java
│   └── Meta.java
├── exception/
│   └── EntidadeNaoEcontradaException.java
├── factory/
│   └── ConnectionFactory.java
└── config/
    └── CorsConfig.java
```

## 7. Testando os Endpoints

### Usando curl:

```bash
# Login
curl -X POST http://localhost:8080/api/usuarios/login \
  -H "Content-Type: application/json" \
  -d '{"email":"joao@email.com","senha":"senha123"}'

# Listar contas
curl http://localhost:8080/api/contas

# Criar transação
curl -X POST http://localhost:8080/api/transacoes \
  -H "Content-Type: application/json" \
  -d '{
    "contaId": 1,
    "tipo": "saida",
    "categoria": "Alimentação",
    "descricao": "Compra no mercado",
    "valor": 150.50,
    "metodoPagamento": "pix",
    "status": "concluida"
  }'
```

## 8. Notas Importantes

1. **Gerenciamento de Conexões**: Considere usar um pool de conexões em produção
2. **Validação**: Adicione validação de dados nas entidades com Bean Validation
3. **Tratamento de Erros**: Implemente um @ControllerAdvice para tratamento global de erros
4. **Segurança**: Em produção, adicione autenticação JWT e autorização
5. **Logging**: Adicione logs para rastrear requisições e erros

## 9. Próximos Passos

- [ ] Implementar autenticação JWT
- [ ] Adicionar validações com Bean Validation
- [ ] Criar testes unitários e de integração
- [ ] Adicionar documentação Swagger/OpenAPI
- [ ] Implementar paginação nos endpoints de listagem
- [ ] Adicionar cache com Redis
- [ ] Implementar rate limiting

---

Com esses controllers implementados, o frontend Next.js estará totalmente integrado com o backend Java!
