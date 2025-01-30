from rich.console import Console
from rich.table import Table
from rich import box

console = Console()

def display_header(text: str):
    table = Table(box=box.DOUBLE, show_header=False)
    table.add_row(f"[bold magenta]{text}[/bold magenta]")
    console.print(table)

def format_question(question: Question, q_num: int, total: int) -> str:
    table = Table(
        title=f"Question {q_num}/{total} ({question.difficulty.title()})",
        box=box.ROUNDED,
        show_header=False
    )
    table.add_row(f"[bold]{question.text}[/bold]")
    
    if question.options:
        for i, option in enumerate(question.options, 1):
            table.add_row(f"{i}. {option}")
    
    console.print(table)
    return console.input("[bold yellow]Your answer: [/]").strip()
