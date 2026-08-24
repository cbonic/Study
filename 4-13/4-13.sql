-- 問1 全従業員の name, salary, hire_date を入社日が新しい順で表示する。
SELECT name, salary, hire_date
FROM employees
ORDER BY hire_date DESC;

-- 問2 営業部門の従業員のうち、salary が 300000 以上の人を表示する。
SELECT e.*
FROM employees e
INNER JOIN departments d
    ON e.department_id = d.id
WHERE d.name = '営業'
AND e.salary >= 300000;


-- 問3 部門ごとの従業員数を表示する。
SELECT d.name, COUNT(e.id) AS employee_count
FROM departments d
LEFT JOIN employees e
    ON d.id = e.department_id
GROUP BY d.id, d.name;


-- 問4 従業員名と部署名を一覧で表示する（JOIN）。
SELECT e.name AS employee_name,
       d.name AS department_name
FROM employees e
INNER JOIN departments d
    ON e.department_id = d.id;


-- 問5 プロジェクトごとの参加人数を表示する。
SELECT p.name,
       COUNT(ep.employee_id) AS participant_count
FROM projects p
LEFT JOIN employee_projects ep
    ON p.id = ep.project_id
GROUP BY p.id, p.name;


-- 問6 従業員ごとの合計作業時間を表示し、時間の多い順に並べる。
SELECT e.name,
       SUM(ep.hours) AS total_hours
FROM employees e
INNER JOIN employee_projects ep
    ON e.id = ep.employee_id
GROUP BY e.id, e.name
ORDER BY total_hours DESC;


-- 問7 部門ごとの最高給与を表示する。
SELECT d.name,
       MAX(e.salary) AS max_salary
FROM departments d
INNER JOIN employees e
    ON d.id = e.department_id
GROUP BY d.id, d.name;


-- 問8 プロジェクトに参加していない従業員を表示する。
SELECT e.name
FROM employees e
LEFT JOIN employee_projects ep
    ON e.id = ep.employee_id
WHERE ep.employee_id IS NULL;