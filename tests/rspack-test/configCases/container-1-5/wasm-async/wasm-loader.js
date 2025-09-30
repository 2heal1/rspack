// WebAssembly 模块加载器
export default async function loadWasmModule() {
  try {
    const response = await fetch('./wasm-module.wasm');
    const bytes = await response.arrayBuffer();
    const module = await WebAssembly.instantiate(bytes);
    
    return {
      instance: module.instance,
      exports: module.instance.exports,
      module: module.module
    };
  } catch (error) {
    console.error('Failed to load WebAssembly module:', error);
    throw error;
  }
}

// 同步版本用于测试
export const wasmModule = {
  add: (a, b) => a + b,
  multiply: (a, b) => a * b
};