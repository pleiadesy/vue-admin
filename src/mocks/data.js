import Mock from 'mockjs'

const count = 200
let list = []

// 模拟200条数据
for(let i = 0; i < count; i++) {
  list.push(
    Mock.mock({
      id: Mock.Random.guid(),
      name: Mock.Random.cname(),
      addr: Mock.mock('@county(true)'),
      'age|18-60': 1,
      birth: Mock.Random.date(),
      gender: Mock.Random.integer(0, 1)
    })
  )
}

export {list}
