package com.p4.backend.shared.kernel;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * Controller to test base entity functionality
 */
@RestController
@RequestMapping("/api/test-entities")
@RequiredArgsConstructor
public class TestEntityController {
    
    private final TestEntityRepository testEntityRepository;
    
    @PostMapping
    public ResponseEntity<TestEntity> createTestEntity(@RequestBody CreateTestEntityRequest request) {
        TestEntity entity = new TestEntity(request.getName(), request.getDescription());
        TestEntity savedEntity = testEntityRepository.save(entity);
        return ResponseEntity.ok(savedEntity);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<TestEntity> getTestEntity(@PathVariable String id) {
        Optional<TestEntity> entity = testEntityRepository.findById(id);
        return entity.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping
    public ResponseEntity<List<TestEntity>> getAllTestEntities() {
        List<TestEntity> entities = testEntityRepository.findAll();
        return ResponseEntity.ok(entities);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<TestEntity> updateTestEntity(@PathVariable String id, 
                                                      @RequestBody UpdateTestEntityRequest request) {
        Optional<TestEntity> optionalEntity = testEntityRepository.findById(id);
        if (optionalEntity.isPresent()) {
            TestEntity entity = optionalEntity.get();
            entity.setName(request.getName());
            entity.setDescription(request.getDescription());
            TestEntity updatedEntity = testEntityRepository.save(entity);
            return ResponseEntity.ok(updatedEntity);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTestEntity(@PathVariable String id) {
        if (testEntityRepository.existsById(id)) {
            testEntityRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    // Request DTOs
    public static class CreateTestEntityRequest {
        private String name;
        private String description;
        
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
    }
    
    public static class UpdateTestEntityRequest {
        private String name;
        private String description;
        
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }
    }
}