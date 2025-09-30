// WebAssembly 异步模块测试
it("should handle WebAssembly async modules in container", async () => {
  const container = await import("./container.js");

  // 获取暴露的 WebAssembly 模块
  const wasmModule = await container.get("./wasm-module");

  // 验证 WebAssembly 模块正确加载
  expect(typeof wasmModule).toBe("object");
  expect(typeof wasmModule.instance).toBe("object");
  expect(typeof wasmModule.exports).toBe("object");

  // 验证 WebAssembly 导出函数
  if (wasmModule.exports.add) {
    expect(typeof wasmModule.exports.add).toBe("function");
    expect(wasmModule.exports.add(1, 2)).toBe(3);
  }
});

it("should handle WebAssembly async module with promise chain", async () => {
  const container = await import("./container.js");

  // 测试多次调用 WebAssembly 模块
  const wasmModule1 = await container.get("./wasm-module");
  const wasmModule2 = await container.get("./wasm-module");

  // 验证模块实例正确复用或重新实例化
  expect(wasmModule1).toEqual(wasmModule2);
});

it("should handle WebAssembly async module errors gracefully", async () => {
  const container = await import("./container.js");

  try {
    await container.get("./non-existent-wasm");
    expect.fail("Should throw error for non-existent module");
  } catch (error) {
    expect(error.message).toContain("does not exist in container");
  }
});
