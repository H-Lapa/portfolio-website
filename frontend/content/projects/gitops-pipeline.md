---
title: "GitOps Delivery Pipeline"
description: "Standardized software delivery using ArgoCD and declarative configs."
image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=400&h=300&fit=crop"
tags: ["ArgoCD", "Kubernetes", "GitOps"]
---

# GitOps Delivery Pipeline

A comprehensive GitOps implementation using ArgoCD for continuous delivery to Kubernetes clusters, enabling declarative, version-controlled application deployments.

## Problem Statement

Traditional deployment methods faced several challenges:

- Manual kubectl commands prone to errors
- Lack of deployment history and auditability
- Configuration drift between environments
- No automated rollback capabilities
- Limited visibility into deployment status

## Solution

Implemented a GitOps workflow where:

1. Git is the single source of truth
2. All changes go through pull requests
3. ArgoCD automatically syncs applications
4. Deployments are declarative and reproducible

## Architecture

### Repository Structure

```
infrastructure/
├── apps/
│   ├── production/
│   │   ├── backend/
│   │   └── frontend/
│   └── staging/
│       ├── backend/
│       └── frontend/
├── base/
│   ├── backend/
│   └── frontend/
└── argocd/
    └── applications/
```

### Application Definition

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: backend-production
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/company/infrastructure
    targetRevision: main
    path: apps/production/backend
  destination:
    server: https://kubernetes.default.svc
    namespace: production
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
    syncOptions:
    - CreateNamespace=true
```

## Key Features

### 1. Automated Synchronization

ArgoCD continuously monitors Git repositories and automatically syncs changes:

- **Auto-sync**: Deploy changes automatically on commit
- **Self-healing**: Revert manual changes to match Git state
- **Pruning**: Remove resources deleted from Git

### 2. Multi-Environment Support

Manage multiple environments with Kustomize overlays:

```yaml
# apps/production/backend/kustomization.yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

namespace: production

bases:
  - ../../../base/backend

patchesStrategicMerge:
  - replicas.yaml
  - resources.yaml

images:
  - name: backend
    newTag: v1.2.3
```

### 3. Progressive Delivery

Implement canary deployments with Argo Rollouts:

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Rollout
metadata:
  name: backend
spec:
  replicas: 5
  strategy:
    canary:
      steps:
      - setWeight: 20
      - pause: {duration: 5m}
      - setWeight: 40
      - pause: {duration: 5m}
      - setWeight: 60
      - pause: {duration: 5m}
      - setWeight: 80
      - pause: {duration: 5m}
```

### 4. RBAC and Security

Fine-grained access control:

- Team-based project isolation
- Role-based permissions
- SSO integration with Azure AD
- Audit logging

## Deployment Workflow

### Standard Deployment Process

1. **Developer** creates feature branch
2. **CI Pipeline** builds and tests
3. **CI** pushes Docker image with semantic version tag
4. **Developer** updates image tag in Git
5. **Pull Request** reviewed and merged
6. **ArgoCD** detects change and syncs automatically
7. **Slack** notification sent on deployment status

### Example Pull Request

```yaml
# Update backend image version
diff --git a/apps/production/backend/kustomization.yaml
images:
  - name: backend
-   newTag: v1.2.2
+   newTag: v1.2.3
```

## Monitoring & Observability

### ArgoCD Dashboard

Visual representation of:
- Application health status
- Sync status and history
- Resource tree view
- Deployment metrics

### Slack Notifications

Automated notifications for:
- Successful deployments
- Sync failures
- Out-of-sync applications
- Health degradations

### Prometheus Metrics

Custom metrics tracked:
- Sync duration
- Deployment frequency
- Failed sync attempts
- Application health scores

## Benefits Achieved

### Operational Improvements

- **70% reduction** in deployment time
- **Zero production incidents** from manual errors
- **100% deployment auditability** via Git history
- **Instant rollback** capabilities

### Developer Experience

- **Self-service deployments** without cluster access
- **Clear deployment history** in Git
- **Preview environments** for every PR
- **Consistent deployment process** across teams

### Security & Compliance

- **No direct kubectl access** needed
- **All changes reviewed** via pull requests
- **Complete audit trail** in Git
- **Automated compliance checks** in CI

## Lessons Learned

### 1. Start Simple

Begin with basic auto-sync before adding progressive delivery and complex strategies.

### 2. Embrace Declarative Config

Resist the urge to use imperative commands. Everything should be in Git.

### 3. Monitor Health Checks

Proper health checks are critical for ArgoCD to understand application status:

```yaml
readinessProbe:
  httpGet:
    path: /health
    port: 8080
  initialDelaySeconds: 10
  periodSeconds: 5
```

### 4. Use Projects for Isolation

Separate projects for different teams or environments:

```yaml
apiVersion: argoproj.io/v1alpha1
kind: AppProject
metadata:
  name: team-backend
spec:
  destinations:
  - namespace: 'backend-*'
    server: '*'
  sourceRepos:
  - https://github.com/company/infrastructure
```

## Future Enhancements

- [ ] Multi-cluster deployments
- [ ] Blue-green deployment strategies
- [ ] Automated rollback on metric thresholds
- [ ] Integration with feature flag system
- [ ] Cost optimization through dynamic scaling

## Technologies

- **ArgoCD**: GitOps controller
- **Argo Rollouts**: Progressive delivery
- **Kustomize**: Configuration management
- **Helm**: Package management
- **GitHub Actions**: CI/CD pipeline
- **Prometheus/Grafana**: Monitoring
- **Slack**: Notifications

## Conclusion

GitOps with ArgoCD has transformed our deployment process, making it more reliable, auditable, and developer-friendly. The declarative approach ensures consistency and the Git-based workflow provides clear visibility into all changes.

This implementation serves as a foundation for modern cloud-native application delivery and has been adopted across all our development teams.
