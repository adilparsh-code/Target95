import Link from "next/link";

const code = `import java.util.Scanner;

class Book {
    protected String title;
    protected String author;
    protected int year;

    Book(String title, String author, int year) {
        this.title = title;
        this.author = author;
        this.year = year;
    }

    void display() {
        System.out.println(title + " | " + author + " | " + year);
    }
}

class EBook extends Book {
    private double sizeMB;

    EBook(String title, String author, int year, double sizeMB) {
        super(title, author, year);
        this.sizeMB = sizeMB;
    }

    @Override
    void display() {
        System.out.println(title + " | " + author + " | " + year + " | " + sizeMB + " MB");
    }
}

public class SmartLibraryAnalytics {
    static int countRecentBooks(Book[] books, int fromYear) {
        int count = 0;
        for (Book book : books) {
            if (book != null && book.year >= fromYear) count++;
        }
        return count;
    }

    static int linearSearch(Book[] books, String title) {
        for (int i = 0; i < books.length; i++) {
            if (books[i] != null && books[i].title.equalsIgnoreCase(title)) return i;
        }
        return -1;
    }

    static int recursiveBinarySearch(String[] titles, String key, int low, int high) {
        if (low > high) return -1;
        int mid = (low + high) / 2;
        int result = titles[mid].compareToIgnoreCase(key);
        if (result == 0) return mid;
        if (result > 0) return recursiveBinarySearch(titles, key, low, mid - 1);
        return recursiveBinarySearch(titles, key, mid + 1, high);
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        Book[] books = {
            new Book("Java Fundamentals", "A. Khan", 2024),
            new EBook("Data Structures", "R. Sharma", 2025, 4.8),
            new Book("Computer Networks", "M. Ali", 2023)
        };

        System.out.println("--- SMART LIBRARY ---");
        for (Book book : books) book.display();

        System.out.println("Recent books since 2024: " + countRecentBooks(books, 2024));
        System.out.print("Search title: ");
        String title = sc.nextLine();
        int index = linearSearch(books, title);
        System.out.println(index >= 0 ? "Book found at position " + (index + 1) : "Book not found");

        String[] sortedTitles = {"Computer Networks", "Data Structures", "Java Fundamentals"};
        System.out.print("Binary-search title: ");
        String key = sc.nextLine();
        int result = recursiveBinarySearch(sortedTitles, key, 0, sortedTitles.length - 1);
        System.out.println(result >= 0 ? "Sorted-list position: " + (result + 1) : "Not found in sorted list");

        sc.close();
    }
}`;

const features = [
  "Store and display book records using objects and arrays",
  "Use inheritance and method overriding for EBook",
  "Pass arrays/objects to methods and return search results",
  "Search titles and handle missing records",
  "Use recursion for binary search on sorted titles",
  "Analyse recent-book data and discuss algorithm complexity",
  "Extend the core with Python list/tuple analytics as an optional module",
];

const milestones = [
  "Write the problem statement and objectives",
  "Design Book and EBook classes",
  "Implement constructors, methods and overriding",
  "Add array storage and searching",
  "Add recursive binary search",
  "Add testing, complexity analysis and report",
  "Prepare viva and demonstrate the working application",
];

export default function ClassXIIProjectPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <Link href="/isc/class-xii" className="text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">← Back to Class XII</Link>
        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <span className="inline-flex rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-800">Target95 Extension Capstone · Optional</span>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">ISC Class XII · Project</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight md:text-5xl">Smart Library Management &amp; Analytics System</h1>
          <p className="mt-4 max-w-4xl text-base leading-7 text-slate-600 dark:text-slate-300">A complete Java capstone that brings Class XII concepts together: objects as parameters/returns, arrays and strings, recursion, inheritance, searching and complexity analysis. It is an optional Target95 extension, not a separate mandatory CISCE Class XII project.</p>
        </section>

        <section className="mt-6 rounded-2xl border border-violet-200 bg-violet-50 p-5 text-sm leading-6 text-violet-950 dark:border-violet-900 dark:bg-violet-950/30 dark:text-violet-100"><strong>Important:</strong> The official ISC Class XII practical structure does not require a separate project. Use this as an extension/capstone unless your school specifically assigns a project.</section>

        <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-2xl font-bold">What students build</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{features.map((feature) => <div key={feature} className="rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-700 dark:bg-slate-800 dark:text-slate-200">✓ {feature}</div>)}</div>
        </section>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-2xl font-bold">Complete Java code</h2>
          <p className="mt-2 text-sm text-slate-500">Save as <strong>SmartLibraryAnalytics.java</strong>.</p>
          <pre className="mt-4 max-h-[720px] overflow-auto rounded-2xl bg-slate-950 p-5 text-xs leading-6 text-slate-100"><code>{code}</code></pre>
        </section>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"><h2 className="text-2xl font-bold">Build milestones</h2><ol className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">{milestones.map((m, i) => <li key={m} className="flex gap-3"><span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">{i + 1}</span><span>{m}</span></li>)}</ol></section>
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"><h2 className="text-2xl font-bold">Testing &amp; viva</h2><ul className="mt-4 space-y-2 text-sm leading-6 text-slate-600 dark:text-slate-300"><li>• Empty/search-miss case</li><li>• Duplicate and mixed-case titles</li><li>• Boundary year values</li><li>• Base-class and EBook objects</li><li>• Explain overriding and dynamic dispatch</li><li>• Explain recursive base case</li><li>• Compare linear search O(n) and binary search O(log n)</li></ul></section>
        </div>
      </div>
    </main>
  );
}
