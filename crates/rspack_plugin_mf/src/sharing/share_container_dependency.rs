use rspack_cacheable::{cacheable, cacheable_dyn};
use rspack_core::{
  AsContextDependency, AsDependencyCodeGeneration, Dependency, DependencyCategory, DependencyId,
  DependencyType, FactorizeInfo, ModuleDependency,
};

#[cacheable]
#[derive(Debug, Clone)]
pub struct ShareContainerDependency {
  id: DependencyId,
  request: String,
  pub share_key: String,
  resource_identifier: String,
  factorize_info: FactorizeInfo,
}

impl ShareContainerDependency {
  pub fn new(share_key: String, request: String) -> Self {
    let resource_identifier = format!("share-container-fallback:{}", share_key);
    Self {
      id: DependencyId::new(),
      request,
      share_key,
      resource_identifier,
      factorize_info: Default::default(),
    }
  }
}

#[cacheable_dyn]
impl Dependency for ShareContainerDependency {
  fn id(&self) -> &DependencyId {
    &self.id
  }

  fn category(&self) -> &DependencyCategory {
    &DependencyCategory::Esm
  }

  fn dependency_type(&self) -> &DependencyType {
    &DependencyType::ShareContainerFallback
  }

  fn resource_identifier(&self) -> Option<&str> {
    Some(&self.resource_identifier)
  }

  fn could_affect_referencing_module(&self) -> rspack_core::AffectType {
    rspack_core::AffectType::True
  }
}

#[cacheable_dyn]
impl ModuleDependency for ShareContainerDependency {
  fn request(&self) -> &str {
    &self.request
  }

  fn user_request(&self) -> &str {
    &self.request
  }

  fn factorize_info(&self) -> &FactorizeInfo {
    &self.factorize_info
  }

  fn factorize_info_mut(&mut self) -> &mut FactorizeInfo {
    &mut self.factorize_info
  }
}

impl AsContextDependency for ShareContainerDependency {}
impl AsDependencyCodeGeneration for ShareContainerDependency {}
