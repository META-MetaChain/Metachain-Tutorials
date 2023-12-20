const hardhatConfig = require('./hardhat.config.js')
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env') })

const wait = (ms = 0) => {
  return new Promise(res => setTimeout(res, ms || 0))
}

const METALog = async text => {
  let str = '🔵'
  for (let i = 0; i < 25; i++) {
    await wait(40)
    if (i == 12) {
      str = `🔵${'🔵'.repeat(i)}🔵`
    } else {
      str = `🔵${' '.repeat(i * 2)}🔵`
    }
    while (str.length < 60) {
      str = ` ${str} `
    }

    console.log(str)
  }

  console.log('metachain Demo:', text)
  await wait(2000)

  console.log('Lets')
  await wait(1000)

  console.log('Go ➡️')
  await wait(1000)
  console.log('...🚀')
  await wait(1000)
  console.log('')
}

const METALogTitle = text => {
  console.log('\n###################')
  console.log(text)
  console.log('###################')
}

const requireEnvVariables = envVars => {
  for (const envVar of envVars) {
    if (!process.env[envVar]) {
      throw new Error(`Error: set your '${envVar}' environmental variable `)
    }
  }
  console.log('Environmental variables properly set 👍')
}
module.exports = {
  METALog,
  METALogTitle,
  hardhatConfig,
  requireEnvVariables,
}
