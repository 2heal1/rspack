// 主入口文件 - 测试 WebAssembly 模块在 Module Federation 中的使用
import container from "./container.js";

async function testWebAssemblyModule() {
  try {
    // 测试同步 WebAssembly 模块
    const wasmSync = await container.get("./wasm-module");
    console.log("WebAssembly sync module loaded:", wasmSync);
    
    // 测试异步 WebAssembly 模块
    const wasmAsync = await container.get("./wasm-async");
    console.log("WebAssembly async module loaded:", wasmAsync);
    
    // 验证函数调用
    if (wasmSync && wasmSync.add) {
      console.log("1 + 2 =", wasmSync.add(1, 2));
    }
    
    if (wasmAsync && wasmAsync.multiply) {
      console.log("3 * 4 =", wasmAsync.multiply(3, 4));
    }
    
    return true;
  } catch (error) {
    console.error("WebAssembly test failed:", error);
    return false;
  }
}

// 导出测试函数供测试框架使用
export { testWebAssemblyModule };

// 如果是直接运行
if (typeof window !== 'undefined') {
  testWebAssemblyModule();
}