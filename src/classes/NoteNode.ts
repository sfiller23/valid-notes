export class NoteNode {
  value: string;
  next: NoteNode | null;

  constructor(value: string) {
    this.value = value;
    this.next = null;
  }
}
