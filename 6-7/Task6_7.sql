-- 問1 従業員名と部署名を一覧で表示する（JOIN）
SELECT employees.name AS employee_name,
       departments.name AS department_name
FROM employees
JOIN departments
ON employees.department_id = departments.id;


-- 問2 部門ごとの平均給与を表示する
SELECT departments.name AS department_name,
       AVG(employees.salary) AS average_salary
FROM departments
JOIN employees
ON departments.id = employees.department_id
GROUP BY departments.id, departments.name;


-- 問3 プロジェクトごとの合計作業時間を表示する
SELECT projects.name AS project_name,
       SUM(employee_projects.hours) AS total_hours
FROM projects
JOIN employee_projects
ON projects.id = employee_projects.project_id
GROUP BY projects.id, projects.name;


-- 問4 最も給与が高い従業員を表示する（サブクエリ可）
SELECT *
FROM employees
WHERE salary = (
    SELECT MAX(salary)
    FROM employees
);


-- 問5 プロジェクトに参加していない従業員を表示する
SELECT employees.*
FROM employees
LEFT JOIN employee_projects
ON employees.id = employee_projects.employee_id
WHERE employee_projects.employee_id IS NULL;


-- 問6 作業時間が50時間以上の従業員名とプロジェクト名を表示する
SELECT employees.name AS employee_name,
       projects.name AS project_name,
       employee_projects.hours
FROM employee_projects
JOIN employees
ON employee_projects.employee_id = employees.id
JOIN projects
ON employee_projects.project_id = projects.id
WHERE employee_projects.hours >= 50;


-- 問7 開発部門の従業員だけを対象に、給与が高い順で表示する
SELECT employees.*
FROM employees
JOIN departments
ON employees.department_id = departments.id
WHERE departments.name = '開発'
ORDER BY employees.salary DESC;


-- 問8 従業員ごとの合計作業時間を表示し、時間の多い順に並べる
SELECT employees.name AS employee_name,
       COALESCE(SUM(employee_projects.hours), 0) AS total_hours
FROM employees
LEFT JOIN employee_projects
ON employees.id = employee_projects.employee_id
GROUP BY employees.id, employees.name
ORDER BY total_hours DESC;