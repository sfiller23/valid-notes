export const notes = [
  "A",
  "A#",
  "B",
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
];

export class Node {
  value: string;
  next: Node | null;

  constructor(value: string) {
    this.value = value;
    this.next = null;
  }
}

export class CyclicLinkedList {
  head: Node | null;
  tail: Node | null;

  constructor(node?: Node | null) {
    this.head = node ?? null;
    this.tail = null;
  }

  isEmpty(): boolean {
    return this.head === null;
  }

  insert(value: string): void {
    const newNode = new Node(value);

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
  getNodeByIndex(index: number): Node | null {
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

  getNextNode(value: string): Node | null {
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

export class Note {
  private frequency: number;
  private sustain: {
    volume: number;
    duration: number;
  };
  private symbol: string;

  constructor(
    symbol: string,
    frequency?: number,
    volume?: number,
    duration?: number
  ) {
    this.frequency = frequency ?? 0;
    this.sustain = {
      volume: volume ?? 0,
      duration: duration ?? 0,
    };
    this.symbol = symbol;
  }

  getSymbol(): string {
    return this.symbol;
  }

  setSymbol(symbol: string): void {
    this.symbol = symbol;
  }

  getFrequency(): number {
    return this.frequency;
  }

  setFrequency(frequency: number): void {
    this.frequency = frequency;
  }

  getDuration(): number {
    return this.sustain.duration;
  }

  setDuration(duration: number): void {
    this.sustain.duration = duration;
  }

  getVolume(): number {
    return this.sustain.volume;
  }

  setVolume(volume: number): void {
    this.sustain.volume = volume;
  }

  setSustain(volume: number, duration: number): void {
    this.sustain = {
      volume: volume,
      duration: duration,
    };
  }

  getSustain(): { volume: number; duration: number } {
    return this.sustain;
  }
}

export type Intervals = [
  number,
  number,
  number,
  number,
  number,
  number,
  number
];

export class MusicalScale {

  private root: string;
  private intervals: Intervals;
  private notes: string[];

  constructor(root: string, intervals: Intervals) {
    let currentIndex = notes.indexOf(root);
    const scaleNotes = [
      root,
      ...intervals.map((interval) => {
        const noteIndex = (currentIndex + interval) % notes.length;
        currentIndex = noteIndex;
        return notes[noteIndex];
      }),
    ];
    scaleNotes.pop();
    this.notes = scaleNotes;
    this.root = root;
    this.intervals = intervals;
  }

  getNotes(): string[] {
    return this.notes;
  }

  getRoot(): string {
    return this.root;
  }

  getIntervals(): Intervals {
    return this.intervals;
  }

  // for future use:
  //   addNote(note: Note): void {
  //     this.notes.push(note);
  //   }

  //   removeNoteAtIndex(index: number): void {
  //     this.notes.splice(index, 1);
  //   }

  //   getNoteAtIndex(index: number): Note {
  //     return this.notes[index];
  //   }

  //   getNoteCount(): number {
  //     return this.notes.length;
  //   }

  //   getFrequencies(): number[] {
  //     return this.notes.map((note) => note.getFrequency());
  //   }

  //   getDurations(): number[] {
  //     return this.notes.map((note) => note.getDuration());
  //   }

  //   getVolumes(): number[] {
  //     return this.notes.map((note) => note.getVolume());
  //   }

  //   getSustains(): { volume: number; duration: number }[] {
  //     return this.notes.map((note) => note.getSustain());
  //   }
}
