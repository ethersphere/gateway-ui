const tableName = 'swarmgateway-kvs'
const podName: string = process.env.REACT_APP_PODNAME ?? 'swarmgateway'
const hostv1 = process.env.REACT_APP_HOSTV1

type JSONValue = string | number | boolean | null | JSONValue[] | { [key: string]: JSONValue }

interface JSONObject {
  [k: string]: JSONValue
}

function fetchApi(url: string, method: string, data?: JSONObject) {
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

  return fetch(hostv1 + url, options).then(res => {
    return res.json()
  })
}

function createKV() {
  const data = {
    podName,
    tableName,
    indexType: 'string',
  }

  return fetchApi('/kv/new', 'POST', data)
}

function checkKVsExists(): Promise<boolean> {
  const data = { podName, tableName }

  return fetchApi('/kv/open', 'POST', data).then(res => {
    if (res) {
      return true
    } else {
      return false
    }
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
