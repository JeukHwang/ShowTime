import type { PlasmoContentScript } from "plasmo"

import { Storage } from "@plasmohq/storage"

import { log } from "~functions/util"

const storage = new Storage()

export const config: PlasmoContentScript = {
  matches: ["https://*/*"],
  run_at: "document_start"
}

async function main() {
  log(`Extension is working!`)
  const url = window.location.href
  log(`${url}`)
  await storage.set("url", url)
}

main()