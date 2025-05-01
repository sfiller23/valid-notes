import { NoteNode } from "./NoteNode";

/**
 * Represents a cyclic linked list for managing musical notes.
 * This structure allows seamless traversal of notes in a circular manner,
 * which is useful for musical scales and patterns.
 */
export class MusicalLinkedList {
  head: NoteNode | null; // The first node in the list
  tail: NoteNode | null; // The last node in the list

  /**
   * Initializes the linked list with an optional starting node.
   * @param node - An optional NoteNode to initialize the list.
   */
  constructor(node?: NoteNode | null) {
    this.head = node ?? null;
    this.tail = null;
  }

  /**
   * Checks if the linked list is empty.
   * @returns True if the list is empty, false otherwise.
   */
  isEmpty(): boolean {
    return this.head === null;
  }

  /**
   * Inserts a new node with the given value into the cyclic linked list.
   * If the list is empty, the new node becomes both the head and tail.
   * Otherwise, the new node is added to the end and points back to the head.
   * @param value - The value to insert into the list.
   */
  insert(value: string): void {
    const newNode = new NoteNode(value);

    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode;
      newNode.next = newNode; // Points to itself to form a cycle
    } else {
      newNode.next = this.head; // New node points to the head
      this.tail!.next = newNode; // Tail points to the new node
      this.tail = newNode; // Update the tail to the new node
    }
  }

  /**
   * Retrieves the node at the specified index in the cyclic linked list.
   * If the index is out of bounds, it returns null.
   * @param index - The index of the node to retrieve.
   * @returns The node at the specified index, or null if not found.
   */
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
        break; // Prevent infinite loop in a cyclic list
      }
    }
    return currentNode;
  }

  /**
   * Retrieves the next node in the list that matches the given value.
   * If no matching node is found, it returns null.
   * @param value - The value to search for in the list.
   * @returns The matching node, or null if not found.
   */
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
        break; // Prevent infinite loop in a cyclic list
      }
    }
    return null;
  }

  /**
   * Builds the cyclic linked list from an array of values.
   * @param values - An array of string values to insert into the list.
   */
  buildList(values: string[]): void {
    values.forEach((value) => this.insert(value));
  }

  /**
   * Removes the first node in the list that matches the given value.
   * Handles three cases:
   * 1. Removing the head node: Updates the head and tail pointers.
   * 2. Removing the tail node: Updates the tail pointer and links the previous node to the head.
   * 3. Removing a middle node: Updates the previous node to skip the current node.
   * @param value - The value of the node to remove.
   */
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
        break; // Prevent infinite loop in a cyclic list
      }
    }
  }

  /**
   * Prints all the values in the cyclic linked list to the console.
   * If the list is empty, it logs a message indicating that.
   */
  print(): void {
    if (this.isEmpty()) {
      console.log("The cyclic linked list is empty.");
      return;
    }

    let currentNode = this.head;

    while (currentNode !== null) {
      currentNode = currentNode.next;

      if (currentNode === this.head) {
        break; // Prevent infinite loop in a cyclic list
      }
    }
  }
}
