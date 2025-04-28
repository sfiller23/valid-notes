import { NoteNode } from "./NoteNode";

export class MusicalLinkedList {
  head: NoteNode | null;
  tail: NoteNode | null;

  constructor(node?: NoteNode | null) {
    this.head = node ?? null;
    this.tail = null;
  }

  isEmpty(): boolean {
    return this.head === null;
  }

  insert(value: string): void {
    const newNode = new NoteNode(value);

    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode;
      newNode.next = newNode;
    } else {
      newNode.next = this.head;
      this.tail!.next = newNode;
      this.tail = newNode;
    }
  }
  getNodeByIndex(index: number): NoteNode | null {
    if (this.isEmpty()) {
      return null;
    }
    let currentNode = this.head;
    let currentIndex = 0;
    while (currentNode !== null && currentIndex !== index) {
      currentNode = currentNode.next;
      currentIndex++;
      if (currentNode === this.head) {
        break;
      }
    }
    return currentNode;
  }

  getNextNode(value: string): NoteNode | null {
    if (this.isEmpty()) {
      return null;
    }
    let currentNode = this.head;
    while (currentNode !== null) {
      if (currentNode.value === value) {
        return currentNode;
      }
      currentNode = currentNode.next;
      if (currentNode === this.head) {
        break;
      }
    }
    return null;
  }

  buildList(values: string[]): void {
    values.forEach((value) => this.insert(value));
  }

  remove(value: string): void {
    if (this.isEmpty()) {
      return;
    }

    let currentNode = this.head;
    let prevNode = null;

    while (currentNode !== null) {
      if (currentNode.value === value) {
        if (currentNode === this.head) {
          this.head = currentNode.next;
          this.tail!.next = this.head;
        } else if (currentNode === this.tail) {
          prevNode!.next = this.head;
          this.tail = prevNode;
        } else {
          prevNode!.next = currentNode.next;
        }
        return;
      }

      prevNode = currentNode;
      currentNode = currentNode.next;

      if (currentNode === this.head) {
        break;
      }
    }
  }

  print(): void {
    if (this.isEmpty()) {
      console.log("The cyclic linked list is empty.");
      return;
    }

    let currentNode = this.head;

    while (currentNode !== null) {
      console.log(currentNode.value);
      currentNode = currentNode.next;

      if (currentNode === this.head) {
        break;
      }
    }
  }
}
