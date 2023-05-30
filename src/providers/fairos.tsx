const tableName = process.env.REACT_APP_KV_TABLENAME ?? 'swarmgateway-kvs'
const podName: string = process.env.REACT_APP_POD_NAME ?? 'swarmgateway'
const username: string = process.env.REACT_APP_POD_USERNAME ?? 'username'
const password: string = process.env.REACT_APP_POD_PASSWORD ?? 'password'
const hostv1 = process.env.REACT_APP_HOSTV1
const hostv2 = process.env.REACT_APP_HOSTV2

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
    console.log('Res:', res) // eslint-disable-line no-console

    if (res.ok) {
      return res.json()
    } else {
      return res.json().then(error => {
        throw error
      })
    }
  })
  /*
  .then(res => {
    console.log('json Res:', res) // eslint-disable-line no-console

    return res
  })
   */
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
      console.log('error getting KV', e) // eslint-disable-line no-console

      return false
    })
}

function addKV(key: string, value: string) {
  const data = { podName, tableName, key, value }

  return checkKVsExists().then(res => {
    if (res) {
      return fetchApi('/kv/entry/put', 'POST', data)
    } else {
      return createKV().then(() => {
        addKV(key, value)
      })
    }
  })
}

export function fetchKVs(): Promise<{ [k: string]: string }> {
  const ans: { [k: string]: string } = {
    'Name 1': 'bladofw',
    'Name 2': 'ovjiow',
  }

  return login().then(() => Promise.resolve(ans))
}

function fetchKey(key: string): Promise<string> {
  const data = { podName, tableName, key }

  return checkKVsExists().then(res => {
    if (res) {
      return fetchApi('/kv/entry/get?' + new URLSearchParams(data), 'GET')
    } else {
      return createKV().then(() => fetchKey(key))
    }
  })
}

export function checkKeyExists(name: string): Promise<boolean> {
  return fetchKey(name).then(res => {
    if (!res) {
      return false
    } else return true
  })
}

export function saveHash(name: string, hash: string) {
  return checkKeyExists(name).then(res => {
    if (res) {
      throw new Error('Name already exists. Choose a different name')
    } else {
      addKV(name, hash)
    }
  })
}
