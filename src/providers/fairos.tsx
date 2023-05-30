import { KEY_STORE_NAME, KV_TABLE, POD_NAME, POD_USERNAME, POD_PASSWORD, POD_HOSTV1, POD_HOSTV2 } from '../constants'

const tableName = KV_TABLE
const podName: string = POD_NAME
const username: string = POD_USERNAME
const password: string = POD_PASSWORD
const hostv1 = POD_HOSTV1
const hostv2 = POD_HOSTV2

const keyStoreName = KEY_STORE_NAME

type JSONValue = string | number | boolean | null | JSONValue[] | { [key: string]: JSONValue }

interface JSONObject {
  [k: string]: JSONValue
}

function fetchApi(url: string, method: string, data?: JSONObject, version = 'v1') {
  type fetchOptions = {
    method: string
    headers: {
      'Content-Type': string
    }
    credentials: RequestCredentials
    body?: string
  }

  const options: fetchOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include' as RequestCredentials,
  }

  if (!data) {
    options.method = 'GET'
  } else if (typeof data == 'object') {
    if (!method) {
      options.method = 'POST'
    } else {
      options.method = method
    }
    options.body = JSON.stringify(data)
  }

  const host = version === 'v1' ? hostv1 : hostv2

  return fetch(host + url, options).then(res => {
    if (res.ok) {
      return res.json()
    } else {
      return res.json().then(error => {
        throw error
      })
    }
  })
}

function login() {
  const data = {
    username,
    password,
  }

  return fetchApi('/user/login', 'POST', data, 'v2')
}

function createKV() {
  const data = {
    podName,
    tableName,
    indexType: 'string',
  }

  return login().then(() => fetchApi('/kv/new', 'POST', data))
}

function checkKVsExists(): Promise<boolean> {
  const data = { podName, tableName }

  return login()
    .then(() => fetchApi('/kv/open', 'POST', data))
    .then(res => {
      if (res) {
        return true
      } else {
        return false
      }
    })
    .catch(e => {
      return false
    })
}

function addKV(key: string, value: string): Promise<boolean> {
  const data = { podName, tableName, key, value }

  return checkKVsExists().then(res => {
    if (res) {
      return fetchApi('/kv/entry/put', 'POST', data).then(() => true)
    } else {
      return createKV().then(() => addKV(key, value))
    }
  })
}

export function fetchKey(key: string): Promise<string> {
  const data = { podName, tableName, key, format: 'string' }

  return checkKVsExists()
    .then(response => {
      if (response) {
        return fetchApi('/kv/entry/get-data?' + new URLSearchParams(data), 'GET').then(res => {
          if (res.values) return res.values
          else return false
        })
      } else {
        return createKV().then(() => fetchKey(key))
      }
    })
    .catch(err => false)
}

export function checkKeyExists(name: string): Promise<boolean> {
  return fetchKey(name).then(res => {
    if (!res) {
      return false
    } else return true
  })
}

export function fetchKeys(): Promise<string[]> {
  return fetchKey(keyStoreName).then(res => {
    try {
      const keys = JSON.parse(res)

      if (Array.isArray(keys)) return keys
      else {
        return []
      }
    } catch (e) {
      return []
    }
  })
}

export function saveHash(name: string, hash: string): Promise<boolean> {
  return fetchKeys().then(keys => {
    if (keys.includes(name)) throw new Error("Name '" + name + "' already exists. Choose a different name")
    else {
      const newKeys = JSON.stringify([...keys, name])

      return addKV(name, hash).then(() => addKV(keyStoreName, newKeys))
    }
  })
}
