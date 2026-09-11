import Link from "next/link";

const code = `import java.util.Scanner;

public class SocialMediaSecuritySystem {
    static boolean isStrongPassword(String password) {
        boolean upper = false, lower = false, digit = false, special = false;
        for (int i = 0; i < password.length(); i++) {
            char ch = password.charAt(i);
            if (Character.isUpperCase(ch)) upper = true;
            else if (Character.isLowerCase(ch)) lower = true;
            else if (Character.isDigit(ch)) digit = true;
            else special = true;
        }
        return password.length() >= 8 && upper && lower && digit && special;
    }

    static void securityAdvice(int age) {
        if (age < 13) {
            System.out.println("Use only age-appropriate platforms with a parent/guardian.");
        } else if (age < 18) {
            System.out.println("Keep profiles private and never share passwords or personal details.");
        } else {
            System.out.println("Use privacy controls, 2FA and review connected applications regularly.");
        }
    }

    static boolean validAge(int age) {
        return age >= 5 && age <= 120;
    }

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter your age: ");
        int age = sc.nextInt();
        sc.nextLine();

        if (!validAge(age)) {
            System.out.println("Invalid age.");
            sc.close();
            return;
        }

        System.out.print("Create a password: ");
        String password = sc.nextLine();

        System.out.println("\\n--- Security Report ---");
        System.out.println("Password strength: " +
                (isStrongPassword(password) ? "Strong" : "Needs improvement"));
        securityAdvice(age);
        System.out.println("Never share OTPs, passwords or recovery codes.");
        System.out.println("Report suspicious links, impersonation and harmful content.");

        sc.close();
    }
}`;

const milestones = [
  "Understand the problem and ethical/security objectives",
  "Design methods and validation rules",
  "Implement password-strength checking",
  "Implement age-appropriate security advice",
  "Test valid, invalid and boundary inputs",
  "Prepare project report and screenshots",
  "Practise viva: explain every method and decision",
];

export default function ClassXIProjectPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <Link href="/isc/class-xi" className="text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">← Back to Class XI</Link>

        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">Official-theme guided project</span>
          <p className="mt-4 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">ISC Class XI · Project</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight md:text-5xl">Age-Appropriate Social Media Security System</h1>
          <p className="mt-4 max-w-4xl text-base leading-7 text-slate-600 dark:text-slate-300">A complete Java console project based on the ISC Class XI project theme of trends in computing and ethical issues. Students build, test and explain the application rather than submitting an unexplained code dump.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-slate-100 p-4 dark:bg-slate-800"><p className="text-xs font-semibold text-slate-500">Language</p><p className="mt-1 font-bold">Java</p></div>
            <div className="rounded-2xl bg-slate-100 p-4 dark:bg-slate-800"><p className="text-xs font-semibold text-slate-500">Core focus</p><p className="mt-1 font-bold">Methods + Strings + Validation</p></div>
            <div className="rounded-2xl bg-slate-100 p-4 dark:bg-slate-800"><p className="text-xs font-semibold text-slate-500">Ethical focus</p><p className="mt-1 font-bold">Privacy + Digital Safety</p></div>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-100">
          <strong>Project note:</strong> This is a Target95 guided implementation aligned with the ISC Class XI project theme. Students should follow their school/teacher's project instructions for the final submission format.
        </section>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-2xl font-bold">Problem & objectives</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">The system gives age-appropriate digital-safety advice and checks whether a password meets basic strength rules. It demonstrates how computing can support responsible technology use.</p>
            <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
              <li>• Validate user input safely.</li>
              <li>• Analyse a password using String and Character methods.</li>
              <li>• Apply age-based decision making.</li>
              <li>• Promote privacy, security and ethical digital behaviour.</li>
            </ul>
          </section>
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-2xl font-bold">Complete Java code</h2>
            <p className="mt-2 text-sm text-slate-500">Save as <strong>SocialMediaSecuritySystem.java</strong>.</p>
            <pre className="mt-4 max-h-[680px] overflow-auto rounded-2xl bg-slate-950 p-5 text-xs leading-6 text-slate-100"><code>{code}</code></pre>
          </section>
        </div>

        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-2xl font-bold">Build milestones</h2>
          <ol className="mt-4 grid gap-3 md:grid-cols-2">
            {milestones.map((milestone, index) => <li key={milestone} className="flex gap-3 rounded-xl bg-slate-50 p-4 text-sm dark:bg-slate-800"><span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white dark:bg-white dark:text-slate-900">{index + 1}</span><span>{milestone}</span></li>)}
          </ol>
        </section>

        <section className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-2xl font-bold">Testing checklist</h2>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-600 dark:text-slate-300"><li>• Age below 5 / above 120</li><li>• Age 12, 13, 17, 18 boundary cases</li><li>• Strong and weak passwords</li><li>• Password with missing uppercase/lowercase/digit/special character</li><li>• Empty or short password</li></ul>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-2xl font-bold">Viva checkpoints</h2>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-600 dark:text-slate-300"><li>• Why are methods used?</li><li>• Why is password analysed character by character?</li><li>• Why are 13 and 18 boundary values tested?</li><li>• What makes the project an ethical-computing application?</li><li>• What happens when the input is invalid?</li></ul>
          </div>
        </section>
      </div>
    </main>
  );
}
