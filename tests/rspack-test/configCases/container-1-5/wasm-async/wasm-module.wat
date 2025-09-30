;; WebAssembly 模块示例
(module
  (func $add (param $a i32) (param $b i32) (result i32)
    local.get $a
    local.get $b
    i32.add
  )
  (export "add" (func $add))
  (export "memory" (memory 0))
  (memory 1)
)

;; 额外的测试函数
(func $multiply (param $a i32) (param $b i32) (result i32)
  local.get $a
  local.get $b
  i32.mul
)
(export "multiply" (func $multiply))