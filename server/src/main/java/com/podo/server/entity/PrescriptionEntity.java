package com.podo.server.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Table(name = "prescription")

public class PrescriptionEntity {

    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name="UUID", strategy = "org.hibernate.id.UUIDGenerator")
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private LocalDateTime created;

    @Column(nullable = false)
    private LocalDateTime updated;

    @ToString.Exclude
    @OneToMany(mappedBy = "prescription_uuid", cascade = CascadeType.PERSIST)
    @Builder.Default
    private List<PrescriptionMedicineBridgeEntity> prescription_uuid = new ArrayList<>();


    // UUID만 받는 생성자
    public PrescriptionEntity(UUID id) {
        this.id = id;
    }
}
