import { IAddress, IConnector, IEvent, IMessage } from "botbuilder"

export class TestConnector implements IConnector {
  private onEventHandler: (events: IEvent[], cb?: (err: Error) => void) => void

  public onEvent(handler: (events: IEvent[], cb?: (err: Error) => void) => void): void {
    this.onEventHandler = handler
  }

  public send(messages: IMessage[], done: (err: Error, addresses?: IAddress[]) => void): void {
      done(null, messages.map((m: IMessage) => m.address))
  }

  public startConversation(address: IAddress, cb: (err: Error, address?: IAddress) => void): void {
    address = Object.assign({}, address,  { conversation: { id: `C${(new Date()).getTime()}` } })

    cb(null, address)
  }
}
